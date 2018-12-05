import { Component, OnInit, HostListener } from '@angular/core';
import{ Renderer } from '@angular/core';


import { MapService } from './map.service';


declare var AMap:any
// export let map;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map:any
  // title:string
  // content:any[]
  constructor(
    private mapService:MapService,
    private renderer:Renderer
  ) { }

  ngOnInit() {
    this.map = new AMap.Map('container', {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom:14, //初始化地图层级
      center: [116.397428, 39.90923] //初始化地图中心点
    });

    // 比例尺
    var scale = new AMap.Scale({
      visible: false
    })

    // 工具条
    var toolBar = new AMap.ToolBar({
      visible: false
    })

    // 鹰眼
    var overView = new AMap.OverView({
      visible: false
    })

    // 添加比例尺
    this.map.addControl(scale);
    scale.show();
    // 添加工具条
    this.map.addControl(toolBar);
    toolBar.show();
    // 添加鹰眼
    this.map.addControl(overView);
    overView.show();
    // 打开鹰眼
    overView.open();

    // this.test();
  }

  test(){
    console.log(this.map);
    this.mapService.test().subscribe(result => {
      // do something...
    });
  }

  // 绘制
  draw() {
    this.map.plugin(["AMap.MouseTool"],function(map){ 
      //在地图中添加MouseTool插件
      console.log(map);
       var mouseTool = new AMap.MouseTool(map);
   
       //用鼠标工具画多边形
       var drawPolygon = mouseTool.polygon(); 
   
       //添加事件
       AMap.event.addListener( mouseTool,'draw',function(e){
           console.log(e.obj.getPath());//获取路径/范围
       });
   });
  }
  // 添加多边形
  addpolygon() {
    var path = [
      new AMap.LngLat(116.368904,39.913423),
      new AMap.LngLat(116.382122,39.901176),
      new AMap.LngLat(116.387271,39.912501),
      new AMap.LngLat(116.398258,39.904600)
    ];

    var polygon = new AMap.Polygon({
        path: path,  
        fillColor: '#fff', // 多边形填充颜色
        borderWeight: 2, // 线条宽度，默认为 1
        strokeColor: 'red', // 线条颜色
    });

    this.map.add(polygon);
  }

  // 添加marker
  addmarker() {
    var icon = new AMap.Icon({
      // size: new AMap.Size(20, 30),    // 图标尺寸
      image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",  // Icon的图像
      imageSize: new AMap.Size(30, 40)   // 根据所设置的大小拉伸或压缩图片
    });
    var marker = new AMap.Marker({
      icon: icon,
      position: [116.406315,39.908775],
      offset: new AMap.Pixel(-13, -30)
    });
    marker.setMap(this.map);
    marker.map = this.map;
    marker.createInfoWindow = this.createInfoWindow
    marker.closeInfoWindow = this.closeInfoWindow
    marker.renderer = this.renderer

   //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(marker, 'click', function () {
      //实例化信息窗体
      var title = '方恒假日酒店<span style="font-size:11px;color:#F00;">价格:318</span>',
      content = [];
      content.push("<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：北京市朝阳区阜通东大街6号院3号楼东北8.3公里");
      content.push("电话：010-64733333");
      content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>");
      var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: marker.createInfoWindow(title, content.join("<br/>"),marker),
        offset: new AMap.Pixel(16, -45)
      });
      
      infoWindow.open(marker.map, marker.getPosition());
    });
    
  
  
  }

  //构建自定义信息窗体
createInfoWindow(title, content,marker) {
  var info = document.createElement("div");
  info.className = "custom-info input-card content-window-card";

  //可以通过下面的方式修改自定义窗体的宽高
  //info.style.width = "400px";
  // 定义顶部标题
  var top = document.createElement("div");
  var titleD = document.createElement("div");
  var closeX = document.createElement("img");
  top.className = "info-top";
  titleD.innerHTML = title;
  closeX.src = "https://webapi.amap.com/images/close2.gif";
  // 添加点击事件
  marker.renderer.listen(closeX,'click',(event)=>{
    marker.closeInfoWindow()
  })
  // marker.map.clearInfoWindow();
  // closeX.onclick = marker.closeInfoWindow(marker);
  // (closeX as any).onclick = "javascript:infoWindow.close()";
  console.log(closeX)

  top.appendChild(titleD);
  top.appendChild(closeX);
  info.appendChild(top);

  // 定义中部内容
  var middle = document.createElement("div");
  middle.className = "info-middle";
  middle.style.backgroundColor = 'white';
  middle.innerHTML = content;
  info.appendChild(middle);

  // 定义底部内容
  var bottom = document.createElement("div");
  bottom.className = "info-bottom";
  bottom.style.position = 'relative';
  bottom.style.top = '0px';
  bottom.style.margin = '0 auto';
  var sharp = document.createElement("img");
  sharp.src = "https://webapi.amap.com/images/sharp.png";
  bottom.appendChild(sharp);
  info.appendChild(bottom);
  return info;
}
  


  // //关闭信息窗体
  closeInfoWindow() {
    this.map.clearInfoWindow();
  }

}