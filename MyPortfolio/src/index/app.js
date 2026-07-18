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


const modal =
document.querySelector(
'.project-modal'
);

const modalContent =
document.getElementById(
'modalContent'
);



function openProject(id){

    const p =
        projects[id];

    if(!p){
        console.warn(
            'Unknown project id:',
            id
        );
        return;
    }

    modalContent.innerHTML = `

    <div class="modal-content">

        <div class="modal-header">

            <div>

                <p class="section-tag">

                    ${p.category}

                </p>

                <h2 class="modal-title">

                    ${p.title}

                </h2>

                <h5>

                    ${p.subtitle}

                </h5>

            </div>

        </div>

        <div class="overview">

            ${p.overview}

        </div>

        <div class="metric-grid">

            ${p.metrics.map(m=>`

                <div class="metric-card">

                    <h2>

                        ${m.value}

                    </h2>

                    <p>

                        ${m.label}

                    </p>

                </div>

            `).join('')}

        </div>

        ${p.contributions ?

        `

        <div class="case-block">

            <h4>

                Contributions

            </h4>

            <ul>

            ${p.contributions.map(c=>`

                <li>${c}</li>

            `).join('')}

            </ul>

        </div>

        `:''}

        ${p.architecture ?

        `

        <div class="case-block">

            <h4>

                Architecture

            </h4>

            <div class="architecture-mini">

                ${p.architecture.map(a=>`

                    <div>

                        ${a}

                    </div>

                `).join('')}

            </div>

        </div>

        `:''}

        <div class="modal-tech">

            ${p.stack.map(t=>`

                <span>

                    ${t}

                </span>

            `).join('')}

        </div>

    </div>

    `;

    modal.classList.add(
        'active'
    );

    document.body.style
        .overflow='hidden';

    animateModal();
}


function animateModal(){

    gsap.from(

        '.modal-title',

        {

            y:80,
            opacity:0,
            duration:1
        }

    );

    gsap.from(

        '.metric-card',

        {

            y:50,
            opacity:0,

            stagger:.1,

            delay:.2
        }

    );

    gsap.from(

        '.architecture-mini div',

        {

            scale:.5,
            opacity:0,

            stagger:.08,

            delay:.4
        }

    );

    gsap.from(

        '.modal-tech span',

        {

            y:30,
            opacity:0,

            stagger:.05,

            delay:.6
        }

    );
}


function animateModal(){

    gsap.from(

        '.modal-title,.metric-card,.modal-tech span',

        {

            y:50,
            opacity:0,
            stagger:.1,
            duration:1

        }
    );

}

animateModal();




const bookMeetingBtn =
document.getElementById(
'bookMeetingBtn'
);

if(bookMeetingBtn){

    bookMeetingBtn.addEventListener(
    'click',
    function(e){

        e.preventDefault();

        const calendlyUrl =
            'https://calendly.com/vishalnitikesh/30min';

        if(
            window.Calendly &&
            typeof window.Calendly.initPopupWidget === 'function'
        ){

            window.Calendly.initPopupWidget({
                url: calendlyUrl
            });

        } else {

            window.open(
                calendlyUrl,
                '_blank',
                'noopener,noreferrer,width=900,height=700'
            );

        }

    });

}




const assistantContainer =
    document.querySelector('.ai-assistant');
const assistantOrb =
    document.querySelector('.assistant-orb');

const assistantState = {
    pendingTimer: null,
    isSpeaking: false,
    speechStarted: false
};

function showAssistantOverlay() {
    const existing = document.querySelector('.assistant-overlay');
    if (existing) {
        existing.remove();
        assistantOrb?.setAttribute('aria-expanded', 'false');
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'assistant-overlay';
    overlay.innerHTML = `
        <div class="assistant-overlay__panel">
            <div class="assistant-overlay__title">Quick guide</div>
            <a href="#featured-projects" class="assistant-action">Explore Projects</a>
            <a href="assets/resume/Nitikesh-Vishal(Backend-Engineer-Resume).pdf" class="assistant-action" target="_blank" rel="noopener noreferrer">Download Resume</a>
            <a href="https://calendly.com/vishalnitikesh/30min" class="assistant-action" target="_blank" rel="noopener noreferrer">Book a Call</a>
        </div>
    `;
    document.body.appendChild(overlay);
    assistantOrb?.setAttribute('aria-expanded', 'true');
}

function getPreferredAssistantVoice() {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoiceNames = [
        /microsoft (aria|jenny|guy|zira|davis|sonia|natasha)/i,
        /samantha|ava|allison|zoe|daniel|karen|moira|rishi/i,
        /google uk english|google us english/i
    ];

    return preferredVoiceNames
        .map(pattern => voices.find(voice => pattern.test(voice.name)))
        .find(Boolean) ||
        voices.find(voice => /^en(-|_)/i.test(voice.lang) && voice.localService) ||
        voices.find(voice => /^en(-|_)/i.test(voice.lang)) ||
        voices[0];
}

function startPortfolioIntro() {
    if (assistantState.isSpeaking || assistantState.speechStarted || assistantState.pendingTimer) {
        return;
    }

    const text = `Hello there, and welcome aboard. I am your friendly AI guide, and you are currently exploring the digital headquarter of StackBracket. Now let me quickly show you around. You shall explore the Projects section, that contains more moving parts than most startup roadmaps. Feel free to download resume. And, if you think of collaborating, you may schedule a meeting directly from this portfolio. No lengthy email chains. No "Let's circle back next week". Just pick a time. And if you are a recruiter wondering whether he enjoys debugging production issues at 2 AM... the answer is unfortunately yes. And yuppp... enjoy your visit. See you around.`;

    showAssistantOverlay();

    if (!('speechSynthesis' in window)) {
        return;
    }

    assistantState.pendingTimer = window.setTimeout(() => {
        assistantState.pendingTimer = null;

        if (assistantState.isSpeaking || assistantState.speechStarted || window.speechSynthesis.speaking) {
            return;
        }

        const speech = new SpeechSynthesisUtterance(text);
        speech.rate = .9;
        speech.pitch = 1.03;
        speech.volume = 1;

        speech.onstart = () => {
            assistantState.isSpeaking = true;
            assistantState.speechStarted = true;
            assistantOrb?.classList.add('assistant-speaking');
        };

        speech.onend = () => {
            assistantState.isSpeaking = false;
            assistantState.speechStarted = false;
            assistantOrb?.classList.remove('assistant-speaking');
        };

        speech.onerror = () => {
            assistantState.isSpeaking = false;
            assistantState.speechStarted = false;
            assistantOrb?.classList.remove('assistant-speaking');
        };

        const preferredVoice = getPreferredAssistantVoice();
        if (preferredVoice) {
            speech.voice = preferredVoice;
        }

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    }, 1000);
}


function initAssistant() {
    if (assistantContainer) {
        assistantContainer.classList.add('show');
    }

    assistantOrb?.addEventListener('click', () => {
        startPortfolioIntro();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
} else {
    initAssistant();
}


