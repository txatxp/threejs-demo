let width = window.innerWidth || document.body.clientWidth
let height = window.innerHeight || document.body.clientHeight
// 创建场景对象
let scene = new THREE.Scene();
// 创建一个物体（球体）3个参数：radius、widthSegments、heightSegments
/**
 * radius — 球体半径，默认为1。
 * widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。
 * heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。
 */
let geometry = new THREE.IcosahedronGeometry(60, 0)
/**
 * 创建一个纹理材质，给球体披上袈裟、材质有很多种，我这里选择了一种网格材质
 * 给材质定义一个颜色16进制0x0000ff
 */
let material = new THREE.MeshStandardMaterial({
  color: 0x0000ff
});
/**
 * 创建网格、包装盒
 * 接受两个参数，参数1：需要包装的物体；参数2：吸附在物体表面的材质皮肤
 */
let mesh = new THREE.Mesh(geometry, material);

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




//点光源添加到场景中
scene.add(point); 
/**
 * 把打包好的东西放入场景，默认位置坐标是x:0；y:0; z：0
 */
scene.add(mesh);
// 把坐标系放入场景
scene.add(axes);
//body元素中插入canvas对象
document.body.appendChild(renderer.domElement);
//执行渲染操作   指定场景、相机作为参数
renderer.render(scene, camera);
