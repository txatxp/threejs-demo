let width = window.innerWidth || document.body.clientWidth
let height = window.innerHeight || document.body.clientHeight

// 创建场景对象
let scene = new THREE.Scene();
let objFile = './file/1.obj';
let mtlFile = './file/1.mtl';
let zb = {x:-1.8685959954075102, y:28.026144883516668, z:5.7977438996455195}
// mtl文件加载器对象变量
let MTLLoader = new THREE.MTLLoader();
// obj文件加载器对象变量
let OBJLoader = new THREE.OBJLoader();
// 材质建模加载
MTLLoader.load(mtlFile, function(materials) {
  // 材质建模加载完毕后给建模物体披上袈裟材质
  OBJLoader.setMaterials(materials);
  /**
   * castShadow : Boolean
   * 对象是否被渲染到阴影贴图中。默认值为false。
   * receiveShadow : Boolean
   * 材质是否接收阴影。默认值为false。
   */
  // 建模物体加载
  OBJLoader.load(objFile, function(obj){
    obj.traverse(function(child){
      child.castShadow = true;
      child.receiveShadow = true;
    })
    // 物体碎片化处理 合并 打包
    setTimeout(() => {
      mergeMaterialGeometryMesh(obj)
    }, 2000)
  })
})
// 物体碎片化处理 合并 打包;包括物体、材质、模型
function mergeMaterialGeometryMesh(obj) {
  // obj物体碎片数组
  let geometryArr = []
  // obj物题材质碎片数组
  let materialArr = []
  obj.children.forEach((Element, index) => {
    console.log('**')
      // 碎片细粒打包成数组
      geometryArr.push(Element.geometry)
      materialArr.push(Element.material)
      
  })
  // obj碎片物体合并打包
  let group = THREE.BufferGeometryUtils.mergeBufferGeometries(geometryArr, true);
  // 创建网格包装物体和材质
  let mesh2 = new THREE.Mesh(group, materialArr);
  // 合并好的物体位置
  mesh2.position.set(0,0,0)
  // 合并好的物体居中中标
  mesh2.geometry.center()
  // 合并好的物体网格缩放
  mesh2.scale.set(0.005,0.005,0.005)
  // mesh2.position.set(0, zb.y, zb.z - 7)
  // scene.add(mesh2); 
  // 物体再次打包成一个不脱离固体物体
  let group2 = new THREE.Group();
  group2.add(mesh2)
  group2.scale.set(1,1,1)
  group2.position.set(0,0,0)
  scene.add(group2)
  console.log(12)
}

/**
 * 创建光源
 * 这里创建的是点光源
 */
 let point = new THREE.PointLight(0xffffff);
// 设置光源位置 灯光的摆放位置
point.position.set(400, 200, 300);

// 创建坐标系
axes = new THREE.AxesHelper(1160);

// 创建相机
/**
 * 一般情况有4个参数：
 * fov — 摄像机视锥体垂直视野角度，摄像机视锥体垂直视野角度，从视图的底部到顶部，以角度来表示。默认值是50
 * aspect — 摄像机视锥体长宽比，摄像机视锥体的长宽比，通常是使用画布的宽/画布的高。默认值是1（正方形画布）
 * near — 摄像机视锥体近端面
 * far — 摄像机视锥体远端面
 */
let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
//设置相机位置
camera.position.set(50, 100, 500); 
//设置相机方向(指向的场景哪个物体)
camera.lookAt(scene.position); 

let renderer = new THREE.WebGLRenderer();
//设置渲染区域尺寸
renderer.setSize(width, height);
 //设置背景颜色
renderer.setClearColor(0xb9d3ff, 1);

let OrbitControlsObj = new THREE.OrbitControls(camera, renderer.domElement)
OrbitControlsObj.enabled = true;
//点光源添加到场景中
scene.add(point); 
/**
 * 把打包好的东西放入场景，默认位置坐标是x:0；y:0; z：0
 */
// scene.add(mesh);
// 把坐标系放入场景
scene.add(axes);
//body元素中插入canvas对象
document.body.appendChild(renderer.domElement);
//执行渲染操作   指定场景、相机作为参数
renderer.render(scene, camera);

function renderFn(){
  renderer.render(scene, camera)
  requestAnimationFrame(renderFn)
}
renderFn()
