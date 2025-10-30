(() => {
    // Add controls to a single video element (idempotent).
    const addControls = (video) => {
        if (!video instanceof HTMLVideoElement) {
            return;
        }

        // Only set if missing/falsy to avoid useless attribute churn.
        if (!video.hasAttribute('controls')) {
            video.setAttribute('controls', 'true');
        }
    }

    // Initial pass for any videos already on the page
    document.querySelectorAll("video").forEach(addControls);

    // Observe for dynamically added videos
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (!(node instanceof Element)) {
                    continue;
                }

                if (node.tagName.toLowerCase() === "video") {
                    addControls(node);
                } else {
                    // If a subtree was added, scan it for videos.
                    const vids = node.querySelectorAll?.('video');
                    if (vids && vids.length){
                        vids.forEach(addControls);
                    } 
                }
            }
            // If the site (or player script) removes the controls attribute, put it back.
            if (
                mutation.type === 'attributes' &&
                mutation.attributeName === 'controls' &&
                mutation.target instanceof HTMLVideoElement
            ) {
                const v = mutation.target;
                if (!v.hasAttribute('controls') || !v.controls) addControls(v);
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['controls'] // also watch if something strips controls

    });

    // Some players hydrate late, so re-apply on load
    window.addEventListener("load", () => {
        document.querySelectorAll("video").forEach(addControls);
    });
})();