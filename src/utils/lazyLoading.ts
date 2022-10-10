export let lazyLoading = new IntersectionObserver(entries=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-src')!;
            entry.target.setAttribute('src',url);

        }

    })
});

