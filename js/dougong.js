
    // 创建一个场景变量
    let scene

    // 创建相机变量
    let camera

    // 创建辅助坐标系变量
    let axes

    // 创建环境光变量
    let lightC

    // 点光源
    let light

    // 渲染器变量
    let render

    let width2 = window.innerWidth || document.body.clientWidth
    let height2 = window.innerHeight || document.body.clientHeight
    // 渲染器大小
    let width = window.innerWidth || document.body.clientWidth
    let height = window.innerHeight || document.body.clientHeight
    let w
    let h
    if (width < height) {
        w = height
        h = width
        width = w
        height = h
    }



    // 文件相对路劲
    let relativePath = './static/obj/'

    // 文件数量
    let fileNumner = 10

    // mtl材质文件数组
    let mtlFileArr = []

    // 拖动mtl副本
    let mtlFileArr2 = []

    // obj文件物体数组
    let objFileArr = []

    // 拖动obj文件副本
    let objFileArr2 = []

    // 合并过的物体模型数组，用于拖动旋转，固定不动
    let MeshArr = []

    // 副本零件、用于拖动合并
    let MeshArr2 = []

    // 平面
    let noodles;

    // 平面材质
    let noodlesM;

    // 目标坐标
    let targetPosition;

    // 来源坐标
    let sourcePosition;

    // 原始坐标
    let originalPosition;

    // 目标角度
    let targetRotation;

    // 计算来源坐标和目标坐标的间隔坐标
    let spacingPosition = undefined;

    // 鼠标是否在平面上标识
    let isSelectNoodles = false

    // 范围系数
    const range = 6

    // 已拖入 合并 曹的容器
    let isPutArr = []

    let mouseDown = false
    // 鼠标 或者 手势 相对于文档 document x坐标 
    let mouseX = 0
    // 鼠标 或者 手势 相对于文档 document y坐标 
    let mouseY = 0
    // 鼠标 或者手势 按下一刹那坐标，用于是否可以拖动转动区域的标识系数
    let startX = 0
    // 鼠标拖动区域 界线 控制 转动区 大于这个区域则视为可拖动转动区域
    let moveRegion = width / 2
    let moveRegion2 = width / 3
    // 游戏是否拼接完成
    let gemeIsOver = false

    let wanc = document.getElementById('wanc')
    let center_ = height / 2
    wanc.style.top = center_ + 'px'


    // 场景视角拖动变化变量
    let OrbitControlsObj
    // 动画目标坐标
    let positionObj = [
        {file: './static/obj/1.obj', x:-1.8685959954075102, y:28.026144883516668, z:5.7977438996455195},
        {file: './static/obj/2.obj', x:-1.9315078560004064, y:24.249497289641567, z:10.388034083793267},
        {file: './static/obj/3.obj', x:-1.8925494293479437, y:20.773459712383076, z:9.996182561695182},
        {file: './static/obj/4.obj', x:-1.896835462612247, y:20.27119866635576, z:3.829197269119705},
        {file: './static/obj/5.obj', x:-1.7918101837029985, y:19.14396017798343, z:7.473806967921675},
        {file: './static/obj/6.obj', x:-1.7063673236779338, y:19.420091281405416, z:13.330118786115706},
        {file: './static/obj/7.obj', x:-1.8135436729330197, y:17.227397886378615, z:6.465415059932044},
        {file: './static/obj/8.obj', x:-1.3703599737675907, y:17.28933008659357, z:6.714252932355719},
        {file: './static/obj/9.obj', x:-2.053225074159844, y:14.66615441991121, z:6.7474639212105805},
        {file: './static/obj/10.obj', x:-2.2417738231295656, y:-12.538354314955809, z:6.794723127913602}
    ]
    let positionObj2 = []
    // 处理成指定数据结构
    positionObj.forEach(item => {
        positionObj2.push([
            {x: item.x, v: item.x, rate: 0, file: item.file},
            {y: item.y, v: item.y, rate: 0, file: item.file},
            {z: item.z, v: item.z, rate: 0, file: item.file}
        ])
    })

    // 用于拖动物体模型位置
    let positionObj_ = [
        {file: './static/obj/1.obj', x:-4.380114181142943, y:35.642901677615974, z:-65.28826804731537},
        {file: './static/obj/2.obj', x:-3.1655154581792146, y:22.28231572501533, z:-63.383351231579134},
        {file: './static/obj/3.obj', x:-2.230221021917231, y:11.994076926133294, z:-66.14575384610772},
        {file: './static/obj/4.obj', x:-1.4080739476624444, y:2.9504591093307653, z:-69.43891168368457},
        {file: './static/obj/5.obj', x:-0.7791027708173885, y:-3.96822383596456, z:-69.2042286536155},
        {file: './static/obj/6.obj', x:-0.16597690156616807, y:-11.646437394679559, z:-65.0723602210995},
        {file: './static/obj/7.obj', x:0.45822668995057825, y:-18.51267690136321, z:-70.64468328355593},
        {file: './static/obj/8.obj', x:1.1874890754877327, y:-26.534563142271754, z:-67.41121587919652},
        {file: './static/obj/9.obj', x:-0.17462495666451616, y:-36.758845926792844, z:-68.35613631854483}
    ]
    let positionObj_2 = []
    // 处理成指定数据结构
    positionObj_.forEach(item => {
        positionObj_2.push([
            {x: item.x, v: item.x, rate: 0, file: item.file},
            {y: item.y, v: item.y, rate: 0, file: item.file},
            {z: item.z, v: item.z, rate: 0, file: item.file}
        ])
    })

    // 把需要处理的材质放入数组
    for(let i = 0; i<fileNumner; i++) {
        mtlFileArr.push({
            isLoad: false,
            file: relativePath + (i + 1) + '.mtl',
            mtlObject: null
        })
        mtlFileArr2.push({
            isLoad: false,
            file: relativePath + (i + 1) + '.mtl',
            mtlObject: null
        })
        objFileArr.push({
            isLoad: false,
            file: relativePath + (i + 1) + '.obj',
            object: null
        })
        objFileArr2.push({
            isLoad: false,
            file: relativePath + (i + 1) + '.obj',
            object: null
        })
    }
    console.log('mtl文件数组:', mtlFileArr)
    console.log('obj文件数组:', objFileArr)



    // 创建一个场景 场地 摄影场景
    scene = new THREE.Scene()
    // 创建相机
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

    // 相机初始位置
    camera.position.x = 110;
    camera.position.y = 10;
    camera.position.z = 0;
    // 设置摄像机照射对象 的具体位置，这里把摄像机的照射对象为场景、场地，让摄像机拍摄着这里定义的场地，自然照着了场地里的物体
    camera.lookAt(scene.position)

    // 创建坐标系
    axes = new THREE.AxesHelper(1160);
    // 辅助平面
    noodles = new THREE.PlaneBufferGeometry( 100, 150, 32 );
    // 平面材质
    noodlesM = new THREE.MeshBasicMaterial({color: '#ffffff', side: THREE.DoubleSide, opacity: 0.01,transparent: true});
    // 包装平面
    var noodlesPlane = new THREE.Mesh( noodles, noodlesM );
    noodlesPlane.position.set(-30,0,-50)
    let axis = new THREE.Vector3(0,1,0);
    // noodlesPlane.rotateX(Math.PI/2);//绕x轴旋转π/4
    // 一π==180度 弧度
    // rotateOnAxis沿着指定的轴旋转
    noodlesPlane.rotateOnAxis(axis, Math.PI/2);//绕x轴旋转π/4

    // 创建环境光
    lightC = new THREE.AmbientLight( 0x666666 ); 
    // 创建点光源
    light = new THREE.PointLight( 0xffffff );
    // 设置光照位置

    _spotLight = new THREE.SpotLight(0x666666);
    _spotLight.castShadow = true;
    _spotLight.shadowCameraVisible = true;
    _spotLight.position.set(-50,100,30);
    //设置阴影贴图精度
    _spotLight.shadowMapWidth = _spotLight.shadowMapHeight = 1024*4;
    scene.add(_spotLight);


    light.position.set( 100, 100, 100);
    // 创建渲染器
    render = new THREE.WebGLRenderer({ antialias: true })
    render.shadowMap.enabled = true;

    //  把点灯光源添加到场景、场地
    scene.add( light );
    // 把环境光添加到场地、场景
    scene.add( lightC );
    // 把坐标系放到、添加到场景当中
    // scene.add(axes);
    // 把相机放到场景
    scene.add(camera);
    // 把平面放入场景
    // scene.add(noodlesPlane);


    render.shadowMap.type = THREE.PCFShadowMap;
    render.setPixelRatio( window.devicePixelRatio );
    render.setSize( window.innerWidth, window.innerHeight );
    // render.shadowMapEnabled = true;
    // 设置渲染器渲染范围, 这里渲染大小和屏幕一样的宽高
    render.setSize(width, height)
    // 设置渲染区域画布的颜色
    render.setClearColor('#ebfcfd',1)
    //设置渲染器阴影可用
    render.shadowMapEnabled = true;
    // 把渲染器插入文档流
    document.body.appendChild(render.domElement)
    // if (width2 < height2) {
    //     render.domElement.style.position = 'absolute'
    //     render.domElement.style.left = 0 - ((height2 - width2) / 2) + 'px'
    //     render.domElement.style.top = (height2 - width2) / 2 + 'px'
    //     render.domElement.style.transform = 'rotate(90deg)'
    //     render.domElement.style.transformOrigin = '50% 50%'
    // }


    // 平面拖动
    function noodlesDrag(){
        let noodlesDragObj = new THREE.DragControls([noodlesPlane],camera,render.domElement, true);
        noodlesDragObj.addEventListener('hoveron', function (event) {
            event.object.material.transparent = true
            event.object.material.opacity = 0.5
            // 鼠标是否在平面上标识
            isSelectNoodles = true
        })
        noodlesDragObj.addEventListener( 'hoveroff', function (event) {
            event.object.material.transparent = true
            event.object.material.opacity = 0.01
            // 鼠标是否在平面上标识
            isSelectNoodles = false
        })
        // 鼠标按下物体
        noodlesDragObj.addEventListener( 'dragstart', function (e) {
            // 拖动物体的时候禁止场景视角变换
            OrbitControlsObj.enabled = false;
            // noodlesDragObj.enabled = false;
        } );
        // // 鼠标松开物体
        noodlesDragObj.addEventListener( 'dragend', function (e) {
            // 拖动物体的时候禁止场景视角变换
            // OrbitControlsObj.enabled = true;
            noodlesDragObj.enabled = true;
        } );
        noodlesDragObj.addEventListener( 'drag', function (e) {
            // 拖动物体的时候禁止场景视角变换
            OrbitControlsObj.enabled = false;
            noodlesDragObj.enabled = false;
        } );
    }

    // 图片材质
    var textureLoader = new THREE.TextureLoader();

    // var texture = textureLoader.load( './webgl/UV_Grid_Sm.jpg' , (obj2) => {
    // });

    function fileLoad(type){
        let mtlFileArr_ = type == 1 ? mtlFileArr : mtlFileArr2
        let objFileArr_ = type == 1 ? objFileArr : objFileArr2
        // 创建mtl文件加载器 和 obj 文件加载器
        mtlFileArr_.forEach((item, index) => {
            // mtl文件加载器对象变量
            let MTLLoader = new THREE.MTLLoader();
            // obj文件加载器对象变量
            let OBJLoader = new THREE.OBJLoader();
            OBJLoader.transparent = true;
            MTLLoader.load(item.file, function(materials) {
                item.isLoad = true
                item.mtlObject = materials
                OBJLoader.setMaterials(materials);
                OBJLoader.load(objFileArr_[index].file, function(obj){
                    type == 1 && obj.traverse(function(child){
                            child.castShadow = true;
                            child.receiveShadow = true;
                            // if (child instanceof THREE.Mesh) {
                            //     child.material.map = texture;
                            // }
                            
                    })    
                    //设置模型生成阴影并接收阴影
                    
                    
                    objFileArr_[index].isLoad = true
                    objFileArr_[index].object = obj

                    // 所有文件加载完毕
                    if (index == (mtlFileArr.length - 1)) {
                        setTimeout(() => {
                            if (type == 1) {
                            fileOnloadCallback(index)   
                            } else {
                            fileOnloadCallback2(index)  
                            }
                        }, 1000)
                        
                    }
                })
                
            })    
        })    
    }
    fileLoad(1)

    // 合并模型
    function mergeMesh(meshArrType){
        let objFileArr_ = !meshArrType ? objFileArr : objFileArr2
        objFileArr_.forEach((item, i) => {
            // obj物体碎片数组
            let geometryArr = []
            // obj物题材质碎片数组
            let materialArr = []
            item.object.children.forEach((Element, index) => {
                // 碎片打包
                geometryArr.push(Element.geometry)
                materialArr.push(Element.material)
                
            })
            // obj碎片物体合并打包
            let group = THREE.BufferGeometryUtils.mergeBufferGeometries(geometryArr, true);
            // 创建网格包装物体和材质
            let mesh = new THREE.Mesh(group, materialArr);
            // 合并好的物体位置
            // mesh.position.set(0,0,0)
            mesh['fileObj'] = {
                file: item.file,
                index:  (i + 1)
            }
            // 把除了柱子的其他部分隐藏
            if (!meshArrType) {
                if (mesh.fileObj.index <= 9) {
                    mesh.material.forEach((Element2, intx) => {
                        // Element2.side = THREE.DoubleSide
                        Element2.depthWrite = false
                        Element2.transparent = true
                        Element2.opacity = 0
                    })    
                }
                
            }
            // 合并好的物体居中中标
            mesh.geometry.center()
            // 合并好的物体网格缩放
            mesh.scale.set(0.0004,0.0004,0.0004)
            // 最终模型打包，用于拖动物体
            !meshArrType && MeshArr.push(mesh)
            // 拖动物体模型
            meshArrType && MeshArr2.push(mesh)
            if (meshArrType) {
                if (i < 9) {
                    scene.add( mesh );    
                }
                
            } else {
                scene.add( mesh ); 
            }
        })
    }
    // 鼠标按下物体那一刻坐标
    let dragstartPostion

    function fileOnloadCallback2(){
        function changeOpacityHoveron(e) {
            let index = e.object.fileObj.index
            let Element = MeshArr.filter(item => {
                if (item.fileObj.index == index) {
                    return true
                } else {
                    return false
                }
            })[0]
            
            // 获取动画去向目标坐标
            targetPosition = Element.getWorldPosition(new THREE.Vector3()) || Element.position
            // var quaternion = new THREE.Quaternion();
            // var worldPosition = new THREE.Vector3();
            targetRotation = Element.getWorldQuaternion (new THREE.Euler())
            let tarR = { x: targetRotation._x, y: targetRotation._y, z: targetRotation._z}
            targetRotation = tarR
            // targetRotation.x = targetRotation._x
            // targetRotation.y = targetRotation._y
            // targetRotation.z = targetRotation._z

            
            Element.material.forEach(el => {
                el.transparent = true
                el.opacity = 0.3  
            })
        }
        function changeOpacityHoveroff(e) {
            let index = e.object.fileObj.index
            let Element = MeshArr.filter(item => {
                if (item.fileObj.index == index) {
                    return true
                } else {
                    return false
                }
            })[0]

            Element.material.forEach(el => {
                el.transparent = true
                el.opacity = 0  
            })
        }
        
        function preset(){
            let _obj_ = MeshArr2[9]
            let _obj_index = _obj_.fileObj.index
            let Element = MeshArr.filter(item => {
                if (item.fileObj.index == _obj_index) {
                    return true
                } else {
                    return false
                }
            })[0]
            let targetPsition = Element.position
            let sourcePsition = _obj_.position
            var tween = new TWEEN.Tween(sourcePsition).easing(TWEEN.Easing.Back.Out);
            tween.to(targetPsition, 0);
            tween.start(); 
            
        }
        // obj文件网格模型Mesh合并
        mergeMesh(true)
        // 组装抖拱 定位 各个部件
        assembleMesh(MeshArr2, 2)
        // 把第10个柱子预设到指定位置
        preset()
        
        // 拖拽控件对象
        let dragControls = new THREE.DragControls(MeshArr2,camera,render.domElement);
        
        
        dragControls.addEventListener('hoveron', function (event) {
            console.log(event)
            // 让变换控件对象和选中的对象绑定
            // dragControls.enabled = false;
            
            // event.object.material[0].transparent = true
            // event.object.material[0].opacity = 0.2
            dragstartPostion = JSON.parse(JSON.stringify(event.object.position))
            event.object.visible == true && changeOpacityHoveron(event)
        });
        dragControls.addEventListener( 'hoveroff', function (event) {
            // event.object.material[0].transparent = true
            // event.object.material[0].opacity = 1
            event.object.visible == true && changeOpacityHoveroff(event)
            
        } );
        // 鼠标按下物体
        dragControls.addEventListener( 'dragstart', function (e) {
            dragstartPostion = JSON.parse(JSON.stringify(e.object.position))
            e.object.visible == true && changeOpacityHoveron(e)
            if (e.object.fileObj.index == 10) {
                dragControls.moveIsDisable = true
            } else {
                dragControls.moveIsDisable = false   
            }
            // 拖动物体的时候禁止场景视角变换
            OrbitControlsObj.enabled = false;
            dragControls.enabled = false;
            // dragControls.enabled = true
            // 获取原始坐标
            let riginalP = e.object.position || positionObj_[e.object.fileObj.index - 1]
            let posi = {
                x: riginalP.x,
                y: riginalP.y,
                z: riginalP.z
            }
            originalPosition = posi
        } );
        // 鼠标松开物体
        dragControls.addEventListener( 'dragend', function (e) {
            
            e.object.visible == true && changeOpacityHoveroff(e)

            // 拖动物体的时候禁止场景视角变换
            // OrbitControlsObj.enabled = true;
            // dragControls.enabled = true;
            // 获取来源坐标
            sourcePosition = e.object.position
            let rotation = e.object.rotation
            let rotation2 = {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z,
                _x: rotation._x,
                _y: rotation._y,
                _z: rotation._z
            }
            
            // 检测是否是否拖入可吸入区域
            if (e.object.fileObj.index < 10 && e.object.visible == true) {
                // range 物体间的间距系数
                if(spacingPosition != undefined && spacingPosition <= range) {
                    // targetPosition.z -=30
                    ani(
                        e,
                        sourcePosition,
                        targetPosition,
                        rotation,
                        targetRotation,
                        
                        rotation2,
                        dragstartPostion
                    )

                    
                    // var tween = new TWEEN.Tween(sourcePosition).easing(TWEEN.Easing.Back.Out);
                    // tween.to(targetPosition, 200);
                    // tween.start();    
                    
                    // var tween2 = new TWEEN.Tween(rotation).easing(TWEEN.Easing.Back.Out);
                    // tween2.to(targetRotation, 200);
                    // tween2.start();  

                    // tween2.onComplete(function () {
                    //     console.log('执行完毕')
                        
                    //     e.object.visible = false
                    //     // material
                    //     let Element = MeshArr.filter((ite, index) => {
                    //         if (ite.fileObj.index == e.object.fileObj.index) {
                    //             return true
                    //         } else {
                    //             return false
                    //         }
                    //     })[0]
                    //     Element.material.forEach(el => {
                    //         el.depthWrite = true
                    //         el.transparent = true
                    //         el.opacity = 1
                    //     })


                    //     isPutArr.push({
                    //         moveMesh: e,
                    //         // 移动物体索引
                    //         index: e.object.fileObj.index,
                    //         // 移动物体返回目标旋转坐标
                    //         targetRotation: rotation2,
                    //         // 移动物体开始来源旋转坐标
                    //         sourceRotation: e.object.rotation,
                    //         // 原来不动，只改变透明度物体
                    //         originalMesh: Element,
                    //         sourcePosition: e.object.position,
                    //         targetPosition: dragstartPostion
                    //         // originalMeshIndex: Element.fileObj.index,
                    //     })
                        
                    // })
                    
                    
                    
                    
                } else {
                    
                    var tween = new TWEEN.Tween(sourcePosition).easing(TWEEN.Easing.Back.Out);
                    tween.to(originalPosition, 1000);
                    tween.start(); 
                }    
            }
            
            console.log(isPutArr, '----0-0-')
            console.log('文件：' + e.object.fileObj.index + '的坐标：', e.object.position)
            console.log(positionObj_[e.object.fileObj.index - 1].file, positionObj_[e.object.fileObj.index - 1])
        } );
        dragControls.addEventListener( 'drag', function (e) {
            
            // 拖动物体的时候禁止场景视角变换
            dragControls.enabled = true; 
            
            sourcePosition = e.object.position
            // 计算来源坐标和目标坐标的间隔坐标
            spacingPosition = sourcePosition.distanceTo(targetPosition)
            console.log(spacingPosition)
            // document.getElementById('obj' + e.object.fileObj.index + '-' + 'file').innerHTML = e.object.fileObj.file + '：'
            // document.getElementById("obj" + e.object.fileObj.index).innerHTML = 'x:' + e.object.position.x + ' ' + 'y:' + e.object.position.y + ' ' + 'z:' + e.object.position.z
        } );
        document.getElementById('rainbow-box').style.display = 'none'
    }
    // 防止连续点击报错
    let isOver = true
    // 是否点了自动开始
    let globalSwitch = false
    let globalSwitch2 = false
    function startup() {
        if(isOver && isPutArr.length < 9) {
            isOver = false
            let arr = []
            // 找出没有拖过去的文件
            MeshArr2.forEach(mitem => {
                let isbol = isPutArr.some(pitem => {
                    if(mitem.fileObj.index == pitem.index) {
                        return true
                    } else {
                        return false
                    }
                })
                if (!isbol) {
                    arr.push({
                        object: mitem
                    })
                }
                
            })
            
            let Element = MeshArr.filter(item_ => {
                if (item_.fileObj.index == arr[0].object.fileObj.index) {
                    return true
                } else {
                    return false
                }
            })[0]
            let e = arr[0]
            
        
            let sourcePosition = e.object.position
            // 获取动画去向目标坐标
            let targetPosition = Element.getWorldPosition(new THREE.Vector3()) || Element.position
            let rotation = e.object.rotation
            let targetRotation = Element.getWorldQuaternion (new THREE.Euler())
            
            let dragstartPostion = JSON.parse(JSON.stringify(e.object.position))
            let rotation2 = {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z,
                order: rotation.order,
                _order: rotation._order,
                _x: rotation._x,
                _y: rotation._y,
                _z: rotation._z
            }
            ani(e, sourcePosition, targetPosition, rotation, targetRotation, rotation2, dragstartPostion)
            arr.splice(0, 1)    
        }    
    }
    // 整体自动开始
    document.getElementById('btn-list-play').onclick = function(){
        let num = ( MeshArr2.length - 1) - isPutArr.length;
        if (!globalSwitch2 && num > 0) {
            globalSwitch = true
            
            let j = 0
            let h
            if (num > 0) {
                h = setInterval(() => {
                    if (j < num) {
                        startup()
                    } else {
                        clearInterval(h)
                        globalSwitch = false
                    }
                    j += 1  
                }, 400)    
            }    
        }
        
    }
    // 下一步
    document.getElementById('btn-list-next').onclick = function(){
        // 只有自动开始没有的时候点击有效
        if (!globalSwitch && !globalSwitch2) {
        startup() 
        }
        
    }

    function ani(e, sourcePosition, targetPosition, rotation, targetRotation, rotation2, dragstartPostion){

        var tween = new TWEEN.Tween(sourcePosition).easing(TWEEN.Easing.Back.Out);
        tween.to(targetPosition, 200);
        tween.start();    
        
        var tween2 = new TWEEN.Tween(rotation).easing(TWEEN.Easing.Back.Out);
        tween2.to(targetRotation, 200);
        tween2.start();  

        tween2.onComplete(function () {
            console.log('执行完毕')
            
            e.object.visible = false
            // material
            let Element = MeshArr.filter((ite, index) => {
                if (ite.fileObj.index == e.object.fileObj.index) {
                    return true
                } else {
                    return false
                }
            })[0]
            Element.material.forEach(el => {
                el.depthWrite = true
                el.transparent = true
                el.opacity = 1
            })


            isPutArr.push({
                moveMesh: e,
                // 移动物体索引
                index: e.object.fileObj.index,
                // 移动物体返回目标旋转坐标
                targetRotation: rotation2,
                // 移动物体开始来源旋转坐标
                sourceRotation: e.object.rotation,
                // 原来不动，只改变透明度物体
                originalMesh: Element,
                sourcePosition: e.object.position,
                targetPosition: dragstartPostion
                // originalMeshIndex: Element.fileObj.index,
            })
            isOver = true
            if(isPutArr.length >= 9) {
                wanc.className += ' bounceInDown'
                wanc.className += ' animated'
            }
        })
    }


    var group
    function merge2(MeshArrObj){
        group = new THREE.Group();
        MeshArrObj.forEach(item => {
            group.add(item)
        })
        group.scale.set(1,1,1)
        group.position.set(0,0,0)
        scene.add(group)
    }
    // 文件加载完毕回调
    function fileOnloadCallback(){
        console.log('文件加载完毕。。。')


        
        // obj文件网格模型Mesh合并
        mergeMesh(false)
        merge2(MeshArr)
        // 组装抖拱 定位 各个部件
        assembleMesh(MeshArr)
        // 动画配置
        // animationConfig(MeshArr)
        OrbitControlsObj = new THREE.OrbitControls(camera, render.domElement)
        OrbitControlsObj.enabled = false;
        // 拖拽控件对象
        let dragControls = new THREE.DragControls(MeshArr,camera,render.domElement, true);
        // 鼠标按下物体
        dragControls.addEventListener( 'dragstart', function (e) {
            // 拖动物体的时候禁止场景视角变换
            OrbitControlsObj.enabled = false;
            dragControls.enabled = false;
        } );
        // 鼠标松开物体
        dragControls.addEventListener( 'dragend', function (e) {
            // 拖动物体的时候禁止场景视角变换
            // OrbitControlsObj.enabled = true;
            dragControls.enabled = true;
            console.log(e, '==~!!')
        } );
        dragControls.addEventListener( 'drag', function (e) {
            // 拖动物体的时候禁止场景视角变换
            dragControls.enabled = true;
            OrbitControlsObj.enabled = false;
            // document.getElementById('obj' + e.object.fileObj.index + '-' + 'file').innerHTML = e.object.fileObj.file + '：'
            // document.getElementById("obj" + e.object.fileObj.index).innerHTML = 'x:' + e.object.position.x + ' ' + 'y:' + e.object.position.y + ' ' + 'z:' + e.object.position.z
        } );
        // 生成一个副本零件，用于拖动拼接
        fileLoad(2)
        // noodlesDrag()
        // renderFn()
    }

    // 鼠标按下
    document.addEventListener( 'mousedown', onMouseDown, false );
    // 手指按下
    document.addEventListener( 'touchstart', onMouseDown, false );
    // 鼠标离开，弹起
    document.addEventListener( 'mouseup', onMouseup, false );
    // 手势离开
    document.addEventListener( 'touchend', onMouseup, false );
    document.getElementById('reload').onclick = function(){
        window.location.reload()
    }
    // 防止重复点击
    let isOver2 = true
    function startup2(){
        if (isOver2 && isPutArr && isPutArr.length && !globalSwitch) {
            isOver2 = false
            index = isPutArr.length - 1
            isPutArr[index].originalMesh.material.forEach(el => {
                el.depthWrite = false
                el.transparent = true
                el.opacity = 0
            })
            isPutArr[index].moveMesh.object.visible = true
            
            var tween = new TWEEN.Tween(isPutArr[index].sourcePosition).easing(TWEEN.Easing.Back.Out);
            tween.to(isPutArr[index].targetPosition, 200);
            tween.start();    
            
            var tween2 = new TWEEN.Tween(isPutArr[index].sourceRotation).easing(TWEEN.Easing.Back.Out);
            tween2.to(isPutArr[index].targetRotation, 200);
            tween2.start();  
            isPutArr.splice(index,1)
            tween2.onComplete(function () {
                if(isPutArr.length < 9) {
                    wanc.classList.remove("bounceInDown")
                    wanc.classList.remove("animated")
                }
                isOver2 = true
            })
        }
    }
    document.getElementById('btn-list-prev').onclick = function (){
        if (!globalSwitch && !globalSwitch2) {
            startup2()
        }
    }
    document.getElementById('btn-list-return').onclick = function(){
        if(!globalSwitch && isPutArr.length) {
            // 有没有完成所有回调标识
            globalSwitch2 = true
            let h
            let i = 0
            let num = isPutArr.length
            if (isPutArr.length) {
                
                h = setInterval(() => {
                    if (i < num) {
                        startup2()
                    } else {
                        clearInterval(h)
                        globalSwitch2 = false
                    }
                    i += 1
                }, 400)
            }    
        }
        
    }
    function onMouseDown(event){
        // if (iswitch) {
            event.clientX && event.preventDefault();
            mouseDown = true;
            startX = mouseX = event.clientX || event.touches[0].clientX;//出发事件时的鼠标指针的水平坐标
            mouseY = event.clientY || event.touches[0].clientY;//出发事件时的鼠标指针的水平坐标
            console.log(mouseX, '----', mouseY)
            // rotateStart.set( event.clientX, event.clientY );
            // 如果鼠标或者手势按下坐标在可拖动控制转动区域则激活移动事件
            if (startX < (2 * moveRegion2) && startX > moveRegion2) {
                // 监听鼠标移动
                document.addEventListener( 'mousemove', onMouseMove2, false );
                // 监听手势移动
                document.addEventListener( 'touchmove', onMouseMove2, false );	    
            } else {
                onMouseup()
            }
            
        // }
        
    }
    function onMouseup(event){    
        // if (iswitch) { 
            // 鼠标移开 或者 手势 离开 移除移动事件
            mouseDown = false;
            document.removeEventListener("mousemove", onMouseMove2);
            document.removeEventListener("touchmove", onMouseMove2);	
        // }  
        
    }
    function onMouseMove2(event){
            // if (iswitch) {
            if(!mouseDown){
                return;
            }
            let cx = event.clientX || event.touches[0].clientX  
            let cy = event.clientY || event.touches[0].clientY  
            var deltaX = cx - mouseX;
            var deltaY = cy - mouseY;
            mouseX = event.clientX || event.touches[0].clientX;
            mouseY = event.clientY || event.touches[0].clientY;
            rotateScene(deltaX, deltaY);  	
        // }
                
    }
    function rotateScene(deltaX, deltaY){
        
        //设置旋转方向和移动方向相反，所以加了个负号
        var deg = deltaX/129;
        // MeshArr2[1].rotation.y += deg
        // MeshArr2[0].rotation.y += deg
        // console.log(MeshArr2[0].rotation, '-----yyyy')
        group.rotation.y += deg
        // MeshArr2.forEach(item => {
        //     item.rotation.y += deg
        //     // item.rotateY(deg);
        // })
        console.log(deg)
    }

    // 组装开始
    function assembleMesh(MeshArr, type){
        let __positionObj2 = !type ? positionObj2 : positionObj_2;
        MeshArr.forEach(item => {
            let arr = __positionObj2.filter((filterItem, index2) => {
                if (item.fileObj.file == filterItem[0].file) {
                    return true
                } else {
                    return false
                }
            })
            let position = arr[0]
            
            // item.position.set(position[0].x, position[1].y, position[2].z)
            if (!type) {
                item.position.set(0, position[1].y, position[2].z - 7)
            } else {
                position && item.position.set(0, position[1].y - 3, position[2].z + 10)
            }
            
        })
    }

    // 动画开始
    function animationConfig(MeshArrObj){
        MeshArrObj.forEach((item, index) => {
                let arr = positionObj2.filter((filterItem, index2) => {
                    if (item.fileObj.file == filterItem[0].file) {
                        return true
                    } else {
                        return false
                    }
                })
                let postion = arr[0]
                let numAr = [Math.abs(postion[0].x), Math.abs(postion[1].y), Math.abs(postion[2].z)]
                
                numAr.sort((a, b) => Math.abs(b) - Math.abs(a))
                postion.forEach((pitem, index) => {
                    pitem.rate = 0.1 / (numAr[0] / pitem.v)
                })
                animationC(item, postion)
            
        })
    }
    // 动画位移开始

    function animationC(mesh, postion){
        let [x, y, z] = [0, 0, 0]
        function animation(){
            Math.abs(x) <= Math.abs(postion[0].x) && (x += postion[0].rate)
            Math.abs(y) <= Math.abs(postion[1].y) && (y += postion[1].rate)
            Math.abs(z) <= Math.abs(postion[2].z) && (z += postion[2].rate)
            mesh.position.set(x,y,z)
            if (Math.abs(x) >= Math.abs(postion[0].x) && Math.abs(y) >= Math.abs(postion[1].y) && Math.abs(z) >= Math.abs(postion[2].z)) {
                return false
            } else {
                requestAnimationFrame(animation)
            }   
        }
        animation()
    }


    function renderFn(){
        render.render(scene, camera)
        TWEEN.update();
        requestAnimationFrame(renderFn)
    }
    renderFn()

window.onresize = function(){
    render.setSize( window.innerWidth, window.innerHeight );
    // window.location.reload()
}