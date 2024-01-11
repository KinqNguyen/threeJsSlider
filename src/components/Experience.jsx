import {
  CameraControls,
  Dodecahedron,
  Environment,
  Grid,
  MeshDistortMaterial,
  RenderTexture,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { slideAtom } from "./Overlay";
import { Scene } from "./Scene";

export const scenes = [
  //Pt 1
  {
    path: "models/stylized_planet.glb",
    mainColor: "#f9c0ff",
    name: "Giới thiệu",
    description:
      "ThreeJs là gì?",
    price: 72000,
    range: 660,
    slides: [
      { id: 1, title:'ThreeJs là gì?' , content: [{sub:'Khái niệm:',subContent:['ThreeJs là framework lập trình 3D cho Web trên webGL, (openGL).','SubContent1.2']},{sub:'Độ phức tạp',subContent:['Three.js là một thư viện cao cấp','tập trung vào việc tạo nội dung thay vì chi tiết kỹ thuật đồ họa thấp như WebGL.']}] },
      { id: 2, title:'WebGL', content: [{sub:'Khái niệm:',subContent:['WebGL là một tiêu chuẩn đồ họa 3D trên web','cung cấp API (Interface lập trình ứng dụng) cho việc vẽ đồ họa 3D trực tiếp trong trình duyệt web mà không cần sử dụng các plugin bên ngoài.']},{sub:'Độ phức tạp',subContent:['WebGL là một API thấp cấp, có nghĩa là bạn phải làm việc với nhiều chi tiết đồ họa thấp hơn để vẽ đối tượng và hiệu ứng 3D.']}] },
      { id: 3, title:'So sánh ThreeJs và WebGL', content: [{sub:'Độ phức tạp:',subContent:['WebGL phức tạp hơn và yêu cầu kiến thức chuyên sâu về đồ họa máy tính.', 'Three.js làm cho việc phát triển ứng dụng đồ họa 3D trên web dễ dàng hơn, ']}] },
    ]
  },

  //Pt 2
  {
    path: "models/model3_scene.glb",
    mainColor: "#c0ffe1",
    name: "Cách cài đặt",
    description: "Cách cài đặt ThreeJs",
    price: 29740,
    range: 576,
    slides: [
      { id: 1, title:'Dùng npm' , content: [{sub:'npm',subContent:['npm install --save three']},{sub:'Import',subContent:[`import * as THREE from 'three'`]}] },
      { id: 2, title:'Dùng CDN', content: [{sub:'CDN',subContent:[`import * as THREE from 'https://cdn.skypack.dev/three@<version>';`]}] },
    ]
  },

  //Pt 3
  {
    path: "models/semi_scene.glb",
    mainColor: "#ffdec0",
    name: "Tạo và điều chỉnh đối tượng 3D",
    description: "",
    price: 150000,
    range: 800,
    slides: [
      { id: 1, title:'Tạo Scene, Camera và Renderer:' , content: [{sub:'', image:['./src/assets/taoScene.png']}] },
      { id: 2, title:'Tạo và Thêm Đối Tượng Vào Scene:', content: [{sub:'Đối tượng vuông (BoxGeometry):',image:['./src/assets/objectVuong.png']},{sub:'Đối tượng tròn (SphereGeometry):',image:['./src/assets/objectTron.png']}] },
      { id: 3, title:'Điều Chỉnh Vị Trí và Quay Đối Tượng:', content: [{sub:'',image:['./src/assets/ViTri.png']}] },
      { id: 4, title:'Render Scene:', content: [{sub:'',image:['./src/assets/Render.png']}] },
    ]
  },

  //Pt 4
    {
      path: "models/cybertruck_scene.glb",
      mainColor: "#34d5eb",
    name: "Event",
    description: "Event",
    price: 150000,
    range: 800,
    slides: [
      { id: 1, title:'Thư viện OrbitControls' , content: [{sub:'Cài đặt',subContent:['<script src="path/to/OrbitControls.js"></script>']}] },
      { id: 2, title:'Khởi Tạo OrbitControls và Thêm Vào Scene:', content: [{sub:'Tạo controls',image:['./src/assets/taoControl.png']}] },
      { id: 3, title:'Các sự kiện của OrbitControls', content: [{sub:'Rotate, Zoom',image:['./src/assets/hmmm.png']}] },
    ]
  },
  {
    path: "models/custom2.glb",
    mainColor: "black",
    name: "Demo",
    description: "Demo",
    price: 150000,
    range: 800,
  },

];

const CameraHandler = ({ slideDistance }) => {
  const viewport = useThree((state) => state.viewport);
  const cameraControls = useRef();
  const [slide] = useAtom(slideAtom);
  const lastSlide = useRef(0);

  const { dollyDistance } = useControls({
    dollyDistance: {
      value: 10,
      min: 0,
      max: 50,
    },
  });

  const moveToSlide = async () => {
    await cameraControls.current.setLookAt(
      lastSlide.current * (viewport.width + slideDistance),
      3,
      dollyDistance,
      lastSlide.current * (viewport.width + slideDistance),
      0,
      0,
      true
    );
    await cameraControls.current.setLookAt(
      (slide + 1) * (viewport.width + slideDistance),
      1,
      dollyDistance,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );

    await cameraControls.current.setLookAt(
      slide * (viewport.width + slideDistance),
      0,
      5,
      slide * (viewport.width + slideDistance),
      0,
      0,
      true
    );
  };

  useEffect(() => {
    // Used to reset the camera position when the viewport changes
    const resetTimeout = setTimeout(() => {
      cameraControls.current.setLookAt(
        slide * (viewport.width + slideDistance),
        0,
        5,
        slide * (viewport.width + slideDistance),
        0,
        0
      );
    }, 200);
    return () => clearTimeout(resetTimeout);
  }, [viewport]);

  useEffect(() => {
    if (lastSlide.current === slide) {
      return;
    }
    moveToSlide();
    lastSlide.current = slide;
  }, [slide]);
  return (
    <CameraControls
      ref={cameraControls}
      touches={{
        one: 0,
        two: 0,
        three: 0,
      }}
      mouseButtons={{
        left: 0,
        middle: 0,
        right: 0,
      }}
    />
  );
};

export const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const { slideDistance } = useControls({
    slideDistance: {
      value: 1,
      min: 0,
      max: 10,
    },
  });
  return (
    <>
      <Environment preset={"city"} />
      <CameraHandler slideDistance={slideDistance} />
      {/* MAIN WORLD */}
      <group>
        <mesh position-y={viewport.height / 2 + 0.5}
          scale={[0.3, 0.3,0.3]}
>
          <sphereGeometry args={[1, 8, 8]} />
          <MeshDistortMaterial color={scenes[0].mainColor} speed={3} />
        </mesh>

        <mesh
          position-x={1*(viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 0.5}
        
          scale={[0.3, 0.3,0.3]}
>
          <sphereGeometry args={[1, 8, 8]} />
          <MeshDistortMaterial color={scenes[1].mainColor} speed={3} />
        </mesh>

        <mesh
          position-x={2*(viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 0.5}
        
          scale={[0.3, 0.3,0.3]}
>
          <sphereGeometry args={[1, 8, 8]} />
          <MeshDistortMaterial color={scenes[2].mainColor} speed={3} />
        </mesh>
        <mesh
          position-x={3*(viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 0.5}
        
          scale={[0.3, 0.3,0.3]}
>
          <sphereGeometry args={[1, 8, 8]} />
          <MeshDistortMaterial color={scenes[3].mainColor} speed={3} />
        </mesh>
        <mesh
          position-x={4*(viewport.width + slideDistance)}
          position-y={viewport.height / 2 + 0.5}
        
          scale={[0.3, 0.3,0.3]}
>
          <sphereGeometry args={[1, 8, 8]} />
          <MeshDistortMaterial color={scenes[4].mainColor} speed={3} />
        </mesh>
      </group>


      {scenes.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
            {scene.path == "" ? <></>:<Scene {...scene} />}
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))}
    </>
  );
};
