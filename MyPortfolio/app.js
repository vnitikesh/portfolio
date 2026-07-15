// Mouse Glow

const glow =
document.querySelector(".mouse-glow");

document.addEventListener("mousemove",
(e)=>{

    glow.style.left =
        e.clientX + "px";

    glow.style.top =
        e.clientY + "px";

});

// Typing Animation

new Typed("#typing", {

    strings: [

        "Senior Backend Engineer",
        "AI Systems Engineer",
        "Data Engineer",
        "Cloud Architect"

    ],

    typeSpeed: 60,
    backSpeed: 40,
    loop: true

});

// Counter

const counters =
document.querySelectorAll(".counter");

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const el = entry.target;

            const target =
                +el.dataset.target;

            let count = 0;

            const update = ()=>{

                count += target/80;

                if(count < target){

                    el.innerHTML =
                        count.toFixed(1);

                    requestAnimationFrame(update);

                } else {

                    el.innerHTML =
                        target + "+";
                }

            }

            update();
        }

    });

});

counters.forEach(c=>observer.observe(c));


const reveal =
document.querySelectorAll(
'.about-item,.expert-card,.flow-item'
);

const revealObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add(
                'active-reveal'
            );

        }

    });

},{
    threshold:.2
});

reveal.forEach(item=>{
    revealObserver.observe(item);
});


const hidden =
document.querySelectorAll(
'.timeline-card,.project-card,.contact-card'
);

const sectionObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add(
                'show-item'
            );

        }

    });

},{
    threshold:.2
});

hidden.forEach(item=>{
    sectionObserver.observe(item);
});


document.addEventListener(
'mousemove',
(e)=>{

    const particle =
    document.createElement('span');

    particle.className =
    'particle';

    particle.style.left =
    e.pageX+'px';

    particle.style.top =
    e.pageY+'px';

    document.body.appendChild(
        particle
    );

    setTimeout(()=>{

        particle.remove();

    },1000);

});