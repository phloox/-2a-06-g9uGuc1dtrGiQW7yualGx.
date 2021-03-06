var scene, camera, renderer;
var container, HEIGHT,
        WIDTH, fieldOfView, aspectRatio,
        nearPlane, farPlane, stats,
        geometry, particleCount,
        i, h, color, size,
        materials = [],materials2,
        mouseX = 0,
        mouseY = 0,
        windowHalfX, windowHalfY, cameraZ,
        fogHex, fogDensity, parameters = {},
        parameterCount, particles,particles2;
        init();
        animate();
    function init(){
        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        windowHalfX = WIDTH / 2;
        windowHalfY = HEIGHT / 2;
        fieldOfView = 50;
        aspectRatio = WIDTH / HEIGHT;
        nearPlane = 1;
        farPlane = 2000;
        cameraZ = farPlane / 3;
        fogHex = 0x000000;
        fogDensity = 0.0007;
        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = cameraZ;

        scene = new THREE.Scene();
        var light = new THREE.PointLight(0xffffff);
        light.position.set(0,250,0);
        scene.add(light);
        scene.fog = new THREE.FogExp2(fogHex, fogDensity);
        container = document.createElement('div');
        document.body.appendChild(container);
        document.body.style.margin = 0;
        document.body.style.overflow = 'hidden';
        var x = 0, y = 0;

				var heartShape = new THREE.Shape();

				heartShape.moveTo( x - 50, y - 50 );
				heartShape.bezierCurveTo( x - 50, y - 50, x - 50, y + 25, x+30, y +25);
				heartShape.bezierCurveTo( x + 75, y + 10, x + 80, y - 75, x + 75,y - 75 );
				heartShape.bezierCurveTo( x + 75, y - 85, x + 55, y - 170, x - 45, y - 200 );
				heartShape.bezierCurveTo( x - 85, y - 200, x - 180, y - 120, x - 170, y - 55 );
				heartShape.bezierCurveTo( x - 180, y - 30, x - 120, y + 45, x - 80, y - 10 );
				heartShape.bezierCurveTo( x - 80, y , x - 50, y - 50, x - 50, y - 50 );
        var extrudeSettings = { amount: 50, bevelEnabled: true, bevelSegments: 2, steps: 5, bevelSize: 1, bevelThickness: 1 };

        var geometry2 = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
        var materials2 = new THREE.MeshBasicMaterial( { color: 0xff0000, overdraw: 0.5 } )
        var mesh = new THREE.Mesh( geometry2, materials2 );
        //scene.add(mesh);
         geometry = new THREE.Geometry();
        particleCount = 5000;
        for (j = 0; j < particleCount; j++) {
          var vertex = new THREE.Vector3();
          vertex.x = Math.random() * 2000 - 1000;
          vertex.y = Math.random() * 2000 - 1000;
          vertex.z = Math.random() * 2000 - 1000;
          geometry2.vertices.push(vertex);
        }
        materials2 = new THREE.PointsMaterial({
          color:Math.random() * 0xffffff,
            size: 5
        });
        particles2 = new THREE.Points(geometry2, materials2);
        scene.add(particles2);

        for (i = 0; i < particleCount; i++) {

            var vertex = new THREE.Vector3();
            vertex.x = Math.random() * 2000 - 1000;
            vertex.y = Math.random() * 2000 - 1000;
            vertex.z = Math.random() * 2000 - 1000;

            geometry.vertices.push(vertex);
        }

        parameters = [
            [
                [1, 1, 0.5], 5
            ],
            [
                [0.95, 1, 0.5], 4
            ],
            [
                [0.90, 1, 0.5], 3
            ],
            [
                [0.85, 1, 0.5], 2
            ],
            [
                [0.80, 1, 0.5], 1
            ]
        ];
        parameterCount = parameters.length;
        for (i = 0; i < parameterCount; i++) {

            color = parameters[i][0];
            size = parameters[i][1];

            materials[i] = new THREE.PointsMaterial({

                size: size
            });

            particles = new THREE.Points(geometry, materials[i]);

            particles.rotation.x = Math.random() * 6;
            particles.rotation.y = Math.random() * 6;
            particles.rotation.z = Math.random() * 6;

            scene.add(particles);
        }
        renderer = new THREE.WebGLRenderer(); 1
        renderer.setPixelRatio(window.devicePixelRatio); 1
        renderer.setSize(WIDTH, HEIGHT);

        container.appendChild(renderer.domElement);
        stats = new Stats();
        stats.domElement.style.position = '';
        stats.domElement.style.top = '0px';
        stats.domElement.style.right = '0px';
        container.appendChild(stats.domElement);


         window.addEventListener('resize', onWindowResize, true);
         document.addEventListener('mousemove', onDocumentMouseMove, false);
         document.addEventListener('touchstart', onDocumentTouchStart, false);
         document.addEventListener('touchmove', onDocumentTouchMove, false);

    }
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }
    function render() {
      var time = Date.now() * 0.00005;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;

        camera.lookAt(scene.position);
        for (i = 0; i < scene.children.length; i++) {

            var object = scene.children[i];

            if (object instanceof THREE.PointCloud) {

                object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
            }
        }

        for (i = 0; i < materials.length; i++) {

            color = parameters[i][0];

            h = (360 * (color[0] + time) % 360) / 360;
            materials[i].color.setHSL(h, color[1], color[2]);
        }

        renderer.render(scene, camera);
    }
    function onDocumentMouseMove(e) {
        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;
    }


    function onDocumentTouchStart(e) {

        if (e.touches.length === 1) {

            e.preventDefault();
            mouseX = e.touches[0].pageX - windowHalfX;
            mouseY = e.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove(e) {

        if (e.touches.length === 1) {

            e.preventDefault();
            mouseX = e.touches[0].pageX - windowHalfX;
            mouseY = e.touches[0].pageY - windowHalfY;
        }
    }
    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
