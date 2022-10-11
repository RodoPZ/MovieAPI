"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazyLoading = void 0;
exports.lazyLoading = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-src');
            entry.target.setAttribute('src', url);
        }
    });
});
