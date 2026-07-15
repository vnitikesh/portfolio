const scene = new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
    75,
    window.innerWidth /
    window.innerHeight,
    0.1,
    1000
);

camera.position.z = 80;

const renderer =
new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio,2)
);

document
.getElementById(
    "three-container"
)
.appendChild(
    renderer.domElement
);



const particleCount = 1800;

const geometry =
new THREE.BufferGeometry();

const positions =
new Float32Array(
    particleCount * 3
);

for(let i=0;i<particleCount*3;i++){

    positions[i] =
        (Math.random()-0.5)
        *300;
}

geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
        positions,
        3
    )
);

const material =
new THREE.PointsMaterial({

    color: 0x66e3ff,

    size: .8,

    transparent:true,

    opacity:.8,

    blending:
    THREE.AdditiveBlending
});

const particles =
new THREE.Points(
    geometry,
    material
);

scene.add(particles);


const lineMaterial =
new THREE.LineBasicMaterial({

    color:0x7c5cff,

    transparent:true,

    opacity:.15
});

const lineGeometry =
new THREE.BufferGeometry();

const linePositions = [];

for(let i=0;i<250;i++){

    linePositions.push(

        (Math.random()-0.5)*250,
        (Math.random()-0.5)*250,
        (Math.random()-0.5)*250
    );

    linePositions.push(

        (Math.random()-0.5)*250,
        (Math.random()-0.5)*250,
        (Math.random()-0.5)*250
    );

}

lineGeometry.setAttribute(

    'position',

    new THREE.Float32BufferAttribute(

        linePositions,

        3
    )
);

const lines =
new THREE.LineSegments(
    lineGeometry,
    lineMaterial
);

scene.add(lines);


const nodes = [];

for(let i=0;i<8;i++){

    const geo =
    new THREE.SphereGeometry(
        2,
        32,
        32
    );

    const mat =
    new THREE.MeshBasicMaterial({

        color:
        i%2
        ?0x66e3ff
        :0x7c5cff,

        transparent:true,

        opacity:.7
    });

    const sphere =
    new THREE.Mesh(
        geo,
        mat
    );

    sphere.position.set(

        (Math.random()-0.5)*100,
        (Math.random()-0.5)*60,
        (Math.random()-0.5)*80
    );

    scene.add(sphere);

    nodes.push(sphere);
}


let mouseX = 0;
let mouseY = 0;

window.addEventListener(
'mousemove',
(e)=>{

    mouseX =
        (e.clientX /
        window.innerWidth-.5);

    mouseY =
        (e.clientY /
        window.innerHeight-.5);
});


function animate(){

    requestAnimationFrame(
        animate
    );

    particles.rotation.y +=
        0.0005;

    particles.rotation.x +=
        0.0002;

    lines.rotation.y +=
        0.0008;

    scene.rotation.y +=
        (
            mouseX*0.3
            -
            scene.rotation.y
        )*0.03;

    scene.rotation.x +=
        (
            -mouseY*0.2
            -
            scene.rotation.x
        )*0.03;

    nodes.forEach(
        (node,index)=>{

        node.position.y +=
            Math.sin(
                Date.now()
                *.001
                +index
            )*.01;

        node.rotation.y +=
            .01;

    });

    renderer.render(
        scene,
        camera
    );
}

animate();


window.addEventListener(
'resize',
()=>{

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight
    );

});


