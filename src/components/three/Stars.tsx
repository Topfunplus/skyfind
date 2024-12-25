import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import js_svg from "../../assets/js-official-svgrepo-com.svg";
import mysql_svg from "../../assets/mysql-svgrepo-com.svg";
import react_svg from "../../assets/reactts-svgrepo-com.svg";
import rust_svg from "../../assets/rust-svgrepo-com.svg";
import vscode_svg from "../../assets/vscode-svgrepo-com.svg";
import vue_svg from "../../assets/vue-svgrepo-com.svg";
const PlanetOrbit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight, // 调整为全屏比例
      0.1,
      1000,
    );
    camera.position.set(5, 5, 5); // 设置相机位置
    camera.lookAt(0, 0, 0); // 让相机看向场景中心

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器为全屏
    renderer.setPixelRatio(window.devicePixelRatio); // 保证清晰度

    // 加载SVG纹理
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load(js_svg);
    // 创建多个行星
    const planets = [
      { radius: 3, size: 0.3, speed: 0.0 },
      { radius: 4, size: 0.5, speed: 0.005 },
      { radius: 5, size: 0.4, speed: 0.01 },
      { radius: 4, size: 0.2, speed: 0.013 },
      { radius: 5, size: 0.4, speed: 0.003 },
    ];

    const planetMeshes: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
    }[] = [];

    // 创建太阳（中心）平面
    const planetTextures = [
      textureLoader.load(react_svg),
      textureLoader.load(mysql_svg),
      textureLoader.load(rust_svg),
      textureLoader.load(vscode_svg),
      textureLoader.load(vue_svg),
    ];

    planets.forEach((planetConfig, index) => {
      const planetGeometry = new THREE.SphereGeometry(
        planetConfig.size,
        32,
        32,
      );
      const planetMaterial = new THREE.MeshBasicMaterial({
        map: planetTextures[index],
        transparent: true,
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);

      planet.position.x = planetConfig.radius; // 设置初始位置

      // 将每个行星加入到场景中
      scene.add(planet);
      planetMeshes.push({
        mesh: planet,
        radius: planetConfig.radius,
        speed: planetConfig.speed,
        angle: 0, // 当前角度
      });
    });
    const sunGeometry = new THREE.PlaneGeometry(2, 2);
    const sunMaterial = new THREE.MeshBasicMaterial({
      map: sunTexture,
      transparent: true,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, 0);
    scene.add(sun);

    planets.forEach((planetConfig) => {
      const planetGeometry = new THREE.SphereGeometry(
        planetConfig.size,
        32,
        32,
      );
      const planetMaterial = new THREE.MeshBasicMaterial({
        // color: planetConfig.color,
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);

      planet.position.x = planetConfig.radius; // 设置初始位置

      // 将每个行星加入到场景中
      scene.add(planet);
      planetMeshes.push({
        mesh: planet,
        radius: planetConfig.radius,
        speed: planetConfig.speed,
        angle: 0, // 当前角度
      });
    });

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);

      // 更新每个行星的位置，模拟围绕太阳旋转
      planetMeshes.forEach((planet: any) => {
        planet.angle += planet.speed; // 通过速度调整角度
        planet.mesh.position.x = planet.radius * Math.cos(planet.angle);
        planet.mesh.position.z = planet.radius * Math.sin(planet.angle);
      });

      // 渲染场景
      renderer.render(scene, camera);
    };

    animate();

    // 处理窗口尺寸变化
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onWindowResize);

    onWindowResize();
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default PlanetOrbit;
