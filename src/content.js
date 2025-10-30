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
                if(!(node instanceof Element)){
                    continue;
                }

                if(node.tagName.toLowerCase() === "video"){
                    addControls(node);
                }
            }
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
    });

    // Some players hydrate late, so re-apply on load
    window.addEventListener("load", () => {
        document.querySelectorAll("video").forEach(addControls);
    });
})();