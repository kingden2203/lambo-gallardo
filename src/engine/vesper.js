import {
  AdditiveBlending,
  Box3,
  BackSide,
  BoxGeometry,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  Float32BufferAttribute,
  Fog,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NearestFilter,
  PCFSoftShadowMap,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  Sprite,
  SpriteMaterial,
  SpotLight,
  Vector2,
  Vector3,
  WebGLRenderer,
  ACESFilmicToneMapping
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
function startVesper({ modelUrl }) {
  var $ = (n, e = document) => e.querySelector(n), $$ = (n, e = document) => [...e.querySelectorAll(n)], So = new URLSearchParams(location.search), In = So.has("manual"), Dn = matchMedia("(prefers-reduced-motion: reduce)").matches, clamp = (n, e = 0, t = 1) => Math.min(t, Math.max(e, n)), lerp = (n, e, t) => n + (e - n) * t, smoothstep = (n) => n * n * (3 - 2 * n), smootherstep = (n) => n * n * n * (n * (n * 6 - 15) + 10), easeOutCubic = (n) => 1 - Math.pow(1 - n, 3), Gd = $("#stage"), renderer;
  try {
    renderer = new WebGLRenderer({ canvas: Gd, antialias: !In, powerPreference: "high-performance", preserveDrawingBuffer: In });
  } catch (n) {
    throw document.body.classList.add("nowebgl", "ready"), $("#load").classList.add("gone"), n;
  }
  var Jo = In ? 1 : Math.min(devicePixelRatio || 1, 1.75);
  renderer.setPixelRatio(Jo);
  renderer.setSize(innerWidth, innerHeight, false);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.85;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  var scene = new Scene(), Rd = new Color(328966);
  scene.background = Rd;
  scene.fog = new Fog(1707564, 35, 210);
  var camera = new PerspectiveCamera(30, innerWidth / innerHeight, 0.05, 320);
  function Ed() {
    let n = new Scene(), e = (r, s, v, a, P, i2, u, o = [1, 1, 1]) => {
      let z = new Mesh(new BoxGeometry(r, s, v), new MeshBasicMaterial({ color: new Color(o[0] * u * 0.45, o[1] * u * 0.45, o[2] * u * 0.45), toneMapped: false }));
      z.position.set(a, P, i2), n.add(z);
    }, t = new Mesh(new BoxGeometry(46, 18, 46), new MeshBasicMaterial({ color: new Color(0.01, 0.01, 0.012), side: BackSide }));
    t.position.y = 8, n.add(t);
    let f = new Mesh(new PlaneGeometry(46, 46), new MeshBasicMaterial({ color: new Color(0.02, 0.02, 0.024) }));
    return f.rotation.x = -Math.PI / 2, n.add(f), e(2, 0.05, 10, 0, 7, 0, 8), e(0.9, 0.05, 10, -3.6, 6.3, 0, 5), e(0.9, 0.05, 10, 3.6, 6.3, 0, 5), e(0.1, 3.6, 10, -9.5, 3.4, 0, 3.6, [0.55, 0.85, 1]), e(0.1, 3.6, 10, 9.5, 3.4, 0, 3.6, [1, 0.94, 0.88]), e(11, 3, 0.1, 0, 3.2, -11.5, 2.6, [1, 0.3, 0.6]), e(11, 3, 0.1, 0, 3.2, 11.5, 2.4), e(0.06, 0.3, 8, -5.4, 0.45, 0, 2.2), e(0.06, 0.3, 8, 5.4, 0.45, 0, 2.2), n;
  }
  var Id = new Ud(renderer);
  function Ud(n) {
    return new PMREMGenerator(n);
  }
  scene.environment = Id.fromScene(Ed(), 0.035).texture;
  scene.environmentIntensity = 1;
  var vf = new DirectionalLight(16773604, 1.5);
  vf.castShadow = true;
  vf.shadow.mapSize.set(In ? 1024 : 2048, In ? 1024 : 2048);
  Object.assign(vf.shadow.camera, { left: -4.2, right: 4.2, top: 4.2, bottom: -4.2, near: 1, far: 26 });
  vf.shadow.bias = -4e-4;
  vf.shadow.normalBias = 0.02;
  vf.shadow.radius = 5;
  scene.add(vf, vf.target);
  var c9 = new DirectionalLight(16730709, 0.7);
  c9.position.set(6, 3.5, -7);
  scene.add(c9);
  var ground = new Mesh(new CircleGeometry(320, 96), new MeshStandardMaterial({ color: 328966, roughness: 0.92, metalness: 0, envMapIntensity: 0.035 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  ground.material.envMap = scene.environment;
  var ia = (() => {
    let n = document.createElement("canvas");
    n.width = 8, n.height = 128;
    let e = n.getContext("2d");
    e.fillStyle = "#fff", e.fillRect(0, 0, 8, 70);
    let t = new CanvasTexture(n);
    return t.wrapS = t.wrapT = RepeatWrapping, t.repeat.set(1, 140 / 6), t.colorSpace = SRGBColorSpace, t;
  })(), oa = new MeshBasicMaterial({ color: new Color(0.9, 0.05, 0.1), map: ia, toneMapped: false, transparent: true, opacity: 0, depthWrite: false });
  [-3.4, 3.4, -8, 8].forEach((n) => {
    let e = new Mesh(new PlaneGeometry(0.06, 140), oa);
    e.rotation.x = -Math.PI / 2, e.position.set(n, 4e-3, -20), scene.add(e);
  });
  var world = new Group();
  scene.add(world);
  var tkUpd = function() {
  };
  (function() {
    var S = 11;
    function R() {
      S = S * 1664525 + 1013904223 >>> 0;
      return S / 4294967296;
    }
    var PER = 120, FONT = '"Yu Gothic","Hiragino Sans","Noto Sans JP","Meiryo",sans-serif';
    function cv(w, h) {
      var c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      return c;
    }
    function tex(c) {
      var t = new CanvasTexture(c);
      t.wrapS = t.wrapT = RepeatWrapping;
      t.colorSpace = SRGBColorSpace;
      t.anisotropy = 8;
      return t;
    }
    function glow(c0, c1) {
      var c = cv(64, 64), x = c.getContext("2d"), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, c0);
      g.addColorStop(0.25, c1);
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, 64, 64);
      var t = new CanvasTexture(c);
      t.colorSpace = SRGBColorSpace;
      return t;
    }
    var sc = cv(4, 256), sx = sc.getContext("2d"), sg = sx.createLinearGradient(0, 0, 0, 256);
    sg.addColorStop(0, "#03040a");
    sg.addColorStop(0.4, "#0d0a1e");
    sg.addColorStop(0.58, "#2b1634");
    sg.addColorStop(0.66, "#4b2536");
    sg.addColorStop(1, "#1a0c27");
    sx.fillStyle = sg;
    sx.fillRect(0, 0, 4, 256);
    var ST = new CanvasTexture(sc);
    ST.colorSpace = SRGBColorSpace;
    scene.background = ST;
    function office(lp, cool) {
      var c = cv(512, 512), x = c.getContext("2d"), W = cool ? ["#eaf4ff", "#d6e9ff", "#fff6e0"] : ["#fff1d0", "#ffe6b4", "#f2f6ff"];
      for (var f2 = 0; f2 < 8; f2++) {
        var y = f2 * 64, g = x.createLinearGradient(0, y, 0, y + 64);
        g.addColorStop(0, "#1a2029");
        g.addColorStop(1, "#0c1016");
        x.fillStyle = g;
        x.fillRect(0, y, 512, 64);
        var lit = R() < lp;
        for (var k = 0; k < 8; k++) {
          var x0 = k * 64;
          x.fillStyle = "#222932";
          x.fillRect(x0, y, 64, 12);
          if (lit && R() < 0.85) {
            x.globalAlpha = 0.25 + R() * 0.5;
            x.fillStyle = W[R() * 3 | 0];
            x.fillRect(x0 + 2, y + 13, 61, 49);
            x.globalAlpha = 1;
            var gg = x.createLinearGradient(0, y + 13, 0, y + 62);
            gg.addColorStop(0, "rgba(0,0,0,.45)");
            gg.addColorStop(0.45, "rgba(0,0,0,0)");
            x.fillStyle = gg;
            x.fillRect(x0 + 2, y + 13, 61, 49);
          } else if (R() < 0.15) {
            x.globalAlpha = 0.5;
            x.fillStyle = "#35557f";
            x.fillRect(x0 + 2, y + 13, 61, 49);
            x.globalAlpha = 1;
          }
          x.fillStyle = "#06080c";
          x.fillRect(x0, y, 2, 64);
        }
        x.fillStyle = "#06080c";
        x.fillRect(0, y + 62, 512, 2);
      }
      return tex(c);
    }
    function apt() {
      var c = cv(512, 512), x = c.getContext("2d");
      x.fillStyle = "#34312d";
      x.fillRect(0, 0, 512, 512);
      for (var i2 = 0; i2 < 9e3; i2++) {
        x.fillStyle = "rgba(" + (R() < 0.5 ? "255,255,255" : "0,0,0") + "," + (R() * 0.07).toFixed(3) + ")";
        x.fillRect(R() * 512, R() * 512, 1 + R() * 2, 1 + R() * 2);
      }
      var L = ["#ffd9a0", "#ffcf88", "#fff0d8", "#e8f0ff", "#ffbf7a"];
      for (var f2 = 0; f2 < 8; f2++) {
        var y = f2 * 64;
        x.fillStyle = "#1b1917";
        x.fillRect(0, y + 50, 512, 2);
        x.fillStyle = "#4b4843";
        x.fillRect(0, y + 52, 512, 12);
        for (var k = 0; k < 5; k++) {
          var x0 = k * 102 + 10, lit = R() < 0.4;
          x.fillStyle = lit ? L[R() * 5 | 0] : "#0e1218";
          x.fillRect(x0, y + 8, 82, 42);
          if (lit) {
            x.fillStyle = "rgba(120,60,20,.25)";
            x.fillRect(x0, y + 8, 82, 10);
          }
          x.fillStyle = "#1b1917";
          x.fillRect(x0 + 40, y + 8, 3, 42);
          x.fillStyle = "rgba(210,210,210,.4)";
          x.fillRect(x0 - 6, y + 42, 94, 3);
          if (R() < 0.3) {
            x.fillStyle = "#76746f";
            x.fillRect(x0 + 62, y + 40, 18, 11);
          }
        }
      }
      return tex(c);
    }
    function zak() {
      var c = cv(512, 512), x = c.getContext("2d");
      x.fillStyle = "#1a1a1e";
      x.fillRect(0, 0, 512, 512);
      for (var f2 = 0; f2 < 8; f2++) {
        var y = f2 * 64;
        if (R() < 0.6) {
          x.fillStyle = "hsl(" + (R() * 360 | 0) + ",45%," + (16 + R() * 12 | 0) + "%)";
          x.fillRect(6, y + 5, 500, 54);
          x.fillStyle = "rgba(255,240,210,.75)";
          for (var j = 0; j < 7; j++) {
            var bx2 = 18 + j * 68 + R() * 8, bw = 26 + R() * 26;
            x.fillRect(bx2, y + 14, bw, 6);
            x.fillRect(bx2, y + 26, bw * 0.7, 5);
            x.fillRect(bx2 + bw * 0.3, y + 38, bw * 0.5, 5);
          }
        } else {
          x.fillStyle = "#10131a";
          x.fillRect(6, y + 8, 500, 48);
          for (var j = 0; j < 3; j++) {
            if (R() < 0.6) {
              x.fillStyle = R() < 0.5 ? "#ffe2ae" : "#dfeaff";
              x.fillRect(30 + j * 160, y + 14, 120, 36);
            }
          }
        }
        x.fillStyle = "#0a0a0c";
        x.fillRect(0, y + 62, 512, 2);
      }
      x.fillStyle = "#0a0a0c";
      x.fillRect(0, 0, 5, 512);
      x.fillRect(507, 0, 5, 512);
      return tex(c);
    }
    function shop() {
      var c = cv(512, 128), x = c.getContext("2d");
      x.fillStyle = "#0b0b0f";
      x.fillRect(0, 0, 512, 128);
      for (var k = 0; k < 4; k++) {
        var x0 = k * 128;
        x.fillStyle = "hsl(" + (R() * 360 | 0) + ",50%," + (20 + R() * 12 | 0) + "%)";
        x.fillRect(x0 + 4, 6, 120, 28);
        x.fillStyle = "rgba(255,255,255,.9)";
        x.fillRect(x0 + 14, 14, 40 + R() * 40, 5);
        x.fillRect(x0 + 14, 23, 30 + R() * 30, 4);
        var g = x.createLinearGradient(0, 40, 0, 122);
        g.addColorStop(0, R() < 0.5 ? "#e8b878" : "#d9c3a0");
        g.addColorStop(1, "#a8541c");
        x.globalAlpha = 0.45 + R() * 0.4;
        x.fillStyle = g;
        x.fillRect(x0 + 8, 40, 112, 80);
        x.globalAlpha = 1;
        x.fillStyle = "#1a1410";
        x.fillRect(x0 + 62, 40, 3, 80);
        x.fillRect(x0 + 8, 76, 112, 2);
        if (R() < 0.5) {
          x.fillStyle = "rgba(0,0,0,.35)";
          x.fillRect(x0 + 20, 60 + R() * 10, 22, 60);
        }
      }
      return tex(c);
    }
    function bill(h0, h1, txt) {
      var c = cv(512, 256), x = c.getContext("2d"), g = x.createLinearGradient(0, 0, 512, 256);
      g.addColorStop(0, "hsl(" + h0 + ",90%,52%)");
      g.addColorStop(1, "hsl(" + h1 + ",90%,40%)");
      x.fillStyle = g;
      x.fillRect(0, 0, 512, 256);
      x.fillStyle = "rgba(255,255,255,.9)";
      x.font = "bold 92px " + FONT;
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.fillText(txt, 256, 128);
      x.strokeStyle = "rgba(255,255,255,.7)";
      x.lineWidth = 8;
      x.strokeRect(6, 6, 500, 244);
      return tex(c);
    }
    function vsign(txt, k) {
      var c = cv(128, 512), x = c.getContext("2d");
      x.fillStyle = "#07070c";
      x.fillRect(0, 0, 128, 512);
      x.strokeStyle = k;
      x.lineWidth = 5;
      x.shadowColor = k;
      x.shadowBlur = 14;
      x.strokeRect(9, 9, 110, 494);
      x.fillStyle = k;
      x.textAlign = "center";
      x.textBaseline = "middle";
      var a = Array.from(txt), n = a.length, st = Math.min(84, 470 / n), s0 = (512 - n * st) / 2;
      x.font = "bold " + Math.round(Math.min(72, st * 0.86)) + "px " + FONT;
      a.forEach(function(ch, i2) {
        x.fillText(ch, 64, s0 + st * (i2 + 0.5));
      });
      return tex(c);
    }
    function hsign(txt, k) {
      var c = cv(512, 128), x = c.getContext("2d");
      x.fillStyle = "#07070c";
      x.fillRect(0, 0, 512, 128);
      x.strokeStyle = k;
      x.lineWidth = 5;
      x.shadowColor = k;
      x.shadowBlur = 14;
      x.strokeRect(9, 9, 494, 110);
      x.fillStyle = k;
      x.textAlign = "center";
      x.textBaseline = "middle";
      x.font = "bold 76px " + FONT;
      x.fillText(txt, 256, 68);
      return tex(c);
    }
    function gboard(jp, en2, rot) {
      var c = cv(512, 192), x = c.getContext("2d");
      x.fillStyle = "#0a6a3a";
      x.fillRect(0, 0, 512, 192);
      x.strokeStyle = "#f2f2ee";
      x.lineWidth = 7;
      x.strokeRect(8, 8, 496, 176);
      x.fillStyle = "#f2f2ee";
      x.textBaseline = "alphabetic";
      x.textAlign = "left";
      x.font = "bold 86px " + FONT;
      x.fillText(jp, 34, 104);
      x.font = "bold 34px sans-serif";
      x.fillText(en2, 36, 160);
      x.save();
      x.translate(420, 96);
      x.rotate(rot);
      x.beginPath();
      x.moveTo(0, -62);
      x.lineTo(40, -14);
      x.lineTo(14, -14);
      x.lineTo(14, 56);
      x.lineTo(-14, 56);
      x.lineTo(-14, -14);
      x.lineTo(-40, -14);
      x.closePath();
      x.fill();
      x.restore();
      return new MeshBasicMaterial({ map: tex(c), color: new Color(0.85, 0.9, 0.85) });
    }
    function Acc() {
      var o = { p: [], c: [], u: [], i: [], n: 0 };
      o.q = function(a, b, c, d, u0, v0, u1, v1, k) {
        o.p.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], d[0], d[1], d[2]);
        o.u.push(u0, v0, u1, v0, u1, v1, u0, v1);
        for (var i2 = 0; i2 < 4; i2++) o.c.push(k[0], k[1], k[2]);
        o.i.push(o.n, o.n + 1, o.n + 2, o.n, o.n + 2, o.n + 3);
        o.n += 4;
      };
      o.mesh = function(m) {
        if (!o.n) return null;
        var g = new BufferGeometry();
        g.setAttribute("position", new Float32BufferAttribute(o.p, 3));
        g.setAttribute("color", new Float32BufferAttribute(o.c, 3));
        g.setAttribute("uv", new Float32BufferAttribute(o.u, 2));
        g.setIndex(o.i);
        var me = new Mesh(g, m);
        me.frustumCulled = false;
        return me;
      };
      return o;
    }
    var T = [{ a: Acc(), m: new MeshBasicMaterial({ map: office(0.5, 0), vertexColors: true, side: DoubleSide }), W: 12.8, H: 31.2 }, { a: Acc(), m: new MeshBasicMaterial({ map: office(0.8, 1), vertexColors: true, side: DoubleSide }), W: 12.8, H: 31.2 }, { a: Acc(), m: new MeshBasicMaterial({ map: apt(), vertexColors: true, side: DoubleSide }), W: 12, H: 24 }, { a: Acc(), m: new MeshBasicMaterial({ map: zak(), vertexColors: true, side: DoubleSide }), W: 6, H: 28.8 }];
    var SOL = Acc(), SOLM = new MeshBasicMaterial({ vertexColors: true, side: DoubleSide }), SH = Acc(), SHM = new MeshBasicMaterial({ map: shop(), vertexColors: true, side: DoubleSide });
    function wall(t, cx, cz, w, d, y0, y1, k, o) {
      var A = T[t].a, TW = T[t].W, TH = T[t].H, x0 = cx - w / 2, x1 = cx + w / 2, z0 = cz - d / 2, z1 = cz + d / 2, uw = w / TW, ud = d / TW, v0 = y0 / TH, v1 = y1 / TH;
      A.q([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], o, v0, o + uw, v1, k);
      A.q([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], o, v0, o + uw, v1, k);
      A.q([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], o + 0.37, v0, o + 0.37 + ud, v1, k);
      A.q([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], o + 0.37, v0, o + 0.37 + ud, v1, k);
      SOL.q([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], 0, 0, 0, 0, [0.035, 0.035, 0.04]);
    }
    function sb2(cx, cz, w, d, y0, y1, k) {
      var x0 = cx - w / 2, x1 = cx + w / 2, z0 = cz - d / 2, z1 = cz + d / 2;
      SOL.q([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], 0, 0, 0, 0, k);
      SOL.q([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], 0, 0, 0, 0, k);
      SOL.q([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], 0, 0, 0, 0, k);
      SOL.q([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], 0, 0, 0, 0, k);
      SOL.q([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], 0, 0, 0, 0, k);
    }
    function smat(t, b) {
      return new MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, color: new Color(b, b, b), side: DoubleSide, vertexColors: true });
    }
    var VT = [["\u30E9\u30FC\u30E1\u30F3", "#ff2d6f"], ["\u30AB\u30E9\u30AA\u30B1", "#19e6ff"], ["\u5C45\u9152\u5C4B", "#ffb21a"], ["\u30B9\u30CA\u30C3\u30AF", "#b36bff"], ["\u6771\u4EAC", "#ff3b3b"], ["\u30DB\u30C6\u30EB", "#4dff9a"], ["\u30D1\u30C1\u30F3\u30B3", "#ffd21a"], ["\u5BFF\u53F8", "#ff7a1a"], ["\u713C\u8089", "#ff4d4d"], ["\u85AC\u5C40", "#3fe0a0"], ["\u9EBB\u96C0", "#ffe14d"], ["\u30DE\u30C3\u30B5\u30FC\u30B8", "#ff6ad5"]];
    var HT = [["TOKYO", "#19e6ff"], ["24H", "#ff2d6f"], ["BAR", "#ffb21a"], ["HOTEL", "#b36bff"], ["CAFE", "#4dff9a"], ["KARAOKE", "#ff4d4d"]];
    var VA = VT.map(function(a) {
      return { a: Acc(), m: smat(vsign(a[0], a[1]), 1.5) };
    }), HA = HT.map(function(a) {
      return { a: Acc(), m: smat(hsign(a[0], a[1]), 1.5) };
    });
    var BT = [bill(330, 20, "SALE"), bill(200, 250, "\u6771\u4EAC"), bill(30, 350, "NEW"), bill(260, 310, "\u30CF\u30A4\u30C6\u30AF")], BA = BT.map(function(t) {
      return { a: Acc(), m: new MeshBasicMaterial({ map: t, vertexColors: true, color: new Color(0.9, 0.9, 0.9), side: DoubleSide }) };
    });
    function pq(A, sd, x, y, z, w, h) {
      var zl = sd > 0 ? z - w / 2 : z + w / 2, zr = sd > 0 ? z + w / 2 : z - w / 2;
      A.q([x, y - h / 2, zl], [x, y - h / 2, zr], [x, y + h / 2, zr], [x, y + h / 2, zl], 0, 0, 1, 1, [1, 1, 1]);
    }
    var tints = [[1, 1, 1], [0.92, 0.97, 1.12], [1.1, 0.96, 0.88]], B = [];
    [-1, 1].forEach(function(sd) {
      [0, 1, 2].forEach(function(row) {
        var inner = [17.6, 38, 64][row], z = R() * 5;
        while (z < PER - 5) {
          var t, w, d, h, r = R();
          if (row == 0) {
            if (r < 0.33) {
              t = 3;
              w = 5 + R() * 3;
              d = 7 + R() * 5;
              h = 15 + R() * 22;
            } else if (r < 0.68) {
              t = 2;
              w = 9 + R() * 6;
              d = 10 + R() * 8;
              h = 18 + R() * 28;
            } else {
              t = R() < 0.3 ? 1 : 0;
              w = 10 + R() * 8;
              d = 11 + R() * 8;
              h = 24 + R() * 34;
            }
          } else if (row == 1) {
            t = r < 0.25 ? 2 : r < 0.6 ? 0 : 1;
            w = 10 + R() * 10;
            d = 10 + R() * 12;
            h = 45 + R() * 70;
          } else {
            t = R() < 0.5 ? 0 : 1;
            w = 14 + R() * 12;
            d = 14 + R() * 12;
            h = 80 + R() * 90;
          }
          if (z + d > PER) d = PER - z;
          if (d < 5) break;
          var br = t == 3 ? 0.8 + R() * 0.4 : t == 2 ? 0.7 + R() * 0.3 : t == 1 ? 0.8 + R() * 0.4 : 0.7 + R() * 0.4, tn_ = tints[R() * 3 | 0];
          var b = { sd, row, t, x: sd * (inner + R() * (row ? 5 : 1.6) + w / 2), z: z + d / 2, w, d, h, k: [tn_[0] * br, tn_[1] * br, tn_[2] * br], o: R(), h1: h, sg: [], rf: [], av: null, bb: -1 };
          if (t < 2 && h > 38) {
            b.h1 = h * (0.55 + R() * 0.15);
          }
          var tw_ = b.h1 < h ? b.w * 0.7 : b.w, td_ = b.h1 < h ? b.d * 0.7 : b.d, n = 2 + (R() * 3 | 0);
          for (var i2 = 0; i2 < n; i2++) b.rf.push({ dx: (R() - 0.5) * (tw_ - 2), dz: (R() - 0.5) * (td_ - 2), w: 0.8 + R() * 2.4, d: 0.8 + R() * 2.4, h: 0.6 + R() * 2 });
          if (h > 55 && R() < 0.7) b.av = { dx: (R() - 0.5) * tw_ * 0.6, dz: (R() - 0.5) * td_ * 0.6, m: R() < 0.5 ? 0 : 1, mast: R() < 0.6 };
          if (t < 2 && h > 40 && row < 2 && R() < 0.4) b.bb = R() * 4 | 0;
          if (row == 0) {
            var ns = 2 + (R() * 3 | 0);
            for (var i2 = 0; i2 < ns; i2++) {
              if (R() < 0.88) b.sg.push({ v: R() < 0.72, i: R() * 12 | 0, y: 6 + i2 * 5.4 + R() * 2, dz: (R() - 0.5) * Math.max(0, d - 2), off: 0.3 + R() * 0.4 });
            }
          }
          B.push(b);
          z += d + (R() < 0.25 ? 3 + R() * 6 : 0.5);
        }
      });
    });
    var bm = new Group(), spr = new Group();
    var redT = glow("rgba(255,255,255,1)", "rgba(255,40,40,.8)"), avA = new SpriteMaterial({ map: redT, transparent: true, depthWrite: false, blending: AdditiveBlending, color: new Color(2, 0.3, 0.3), fog: false }), avB = avA.clone();
    tkUpd = function(t) {
      avA.opacity = 0.12 + 0.88 * Math.max(0, Math.sin(t * 2.6));
      avB.opacity = 0.12 + 0.88 * Math.max(0, Math.sin(t * 2.6 + 2.3));
    };
    var poolM = new MeshBasicMaterial({ map: glow("rgba(255,170,80,1)", "rgba(255,120,40,.5)"), transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0.5, color: new Color(1, 0.75, 0.45) }), poolG = new PlaneGeometry(15, 15);
    var lampM = new SpriteMaterial({ map: glow("rgba(255,235,190,1)", "rgba(255,150,60,.7)"), transparent: true, depthWrite: false, blending: AdditiveBlending, color: new Color(1.8, 1.1, 0.5), fog: false });
    var GB = [gboard("\u6E0B\u8C37", "SHIBUYA", 0), gboard("\u9280\u5EA7", "GINZA", -0.8), gboard("\u65B0\u5BBF", "SHINJUKU", 0), gboard("\u7FBD\u7530", "HANEDA", 0.8)], gG = new PlaneGeometry(8, 3), dk = [0.06, 0.06, 0.08], pk = [0.14, 0.14, 0.16], gmeshes = new Group();
    [-2, -1, 0, 1, 2].forEach(function(kb) {
      var z0 = kb * PER;
      B.forEach(function(b) {
        var cz = b.z + z0, sd = b.sd, ex = b.x - sd * b.w / 2, top = b.h;
        wall(b.t, b.x, cz, b.w, b.d, 0, b.h1, b.k, b.o);
        if (b.h1 < b.h) wall(b.t, b.x, cz, b.w * 0.7, b.d * 0.7, b.h1, b.h, b.k, b.o + 0.21);
        b.rf.forEach(function(q) {
          sb2(b.x + q.dx, cz + q.dz, q.w, q.d, top, top + q.h, [0.1, 0.1, 0.12]);
        });
        if (b.av) {
          var ax = b.x + b.av.dx, az = cz + b.av.dz, ay = top;
          if (b.av.mast) {
            sb2(ax, az, 0.25, 0.25, top, top + 11, [0.1, 0.1, 0.12]);
            ay = top + 11;
          }
          var s = new Sprite(b.av.m ? avB : avA);
          s.scale.setScalar(2.4);
          s.position.set(ax, ay + 0.6, az);
          spr.add(s);
        }
        if (b.bb >= 0) {
          var bx2 = ex - sd * 0.5, by = Math.min(b.h1, top) + 3.4;
          sb2(bx2, cz - 1.8, 0.25, 0.25, by - 3.2, by, dk);
          sb2(bx2, cz + 1.8, 0.25, 0.25, by - 3.2, by, dk);
          pq(BA[b.bb].a, sd, bx2 - sd * 0.1, by + 1, cz, 6.4, 3.2);
        }
        if (b.row == 0) {
          var xs = ex - sd * 0.06, zl = sd > 0 ? cz - b.d / 2 : cz + b.d / 2, zr = sd > 0 ? cz + b.d / 2 : cz - b.d / 2;
          SH.q([xs, 0.12, zl], [xs, 0.12, zr], [xs, 4.1, zr], [xs, 4.1, zl], 0, 0, b.d / 8, 1, [0.8, 0.8, 0.8]);
          b.sg.forEach(function(g) {
            var yy2 = Math.min(g.y, b.h1 - 3);
            if (g.v) pq(VA[g.i].a, sd, ex - sd * g.off, yy2, cz + g.dz, 1.1, 4.4);
            else pq(HA[g.i % 6].a, sd, ex - sd * g.off, yy2, cz + g.dz, 2.8, 0.7);
          });
        }
      });
      [-1, 1].forEach(function(sd) {
        for (var k = 0; k < 4; k++) {
          var z = z0 + k * 30 + 8 + (sd > 0 ? 15 : 0);
          sb2(sd * 14.4, z, 0.2, 0.2, 0, 7.6, pk);
          sb2(sd * 13.4, z, 2, 0.14, 7.3, 7.5, pk);
          var s = new Sprite(lampM);
          s.scale.setScalar(3.6);
          s.position.set(sd * 12.5, 7.2, z);
          spr.add(s);
          var p = new Mesh(poolG, poolM);
          p.rotation.x = -Math.PI / 2;
          p.position.set(sd * 8.2, 0.012, z);
          spr.add(p);
        }
      });
      [36, 96].forEach(function(gz, gi) {
        var z = z0 + gz;
        sb2(-13, z, 0.5, 0.5, 0, 8.2, dk);
        sb2(13, z, 0.5, 0.5, 0, 8.2, dk);
        sb2(0, z, 26.5, 0.5, 7.5, 8.2, dk);
        [-4.6, 4.6].forEach(function(bx2, bi) {
          var g = GB[(gi * 2 + bi) % 4], a = new Mesh(gG, g);
          a.position.set(bx2, 6.1, z + 0.28);
          gmeshes.add(a);
          var a2 = new Mesh(gG, g);
          a2.position.set(bx2, 6.1, z - 0.28);
          a2.rotation.y = Math.PI;
          gmeshes.add(a2);
        });
      });
    });
    T.forEach(function(t) {
      var m = t.a.mesh(t.m);
      m && bm.add(m);
    });
    [[SOL, SOLM], [SH, SHM]].forEach(function(p) {
      var m = p[0].mesh(p[1]);
      m && bm.add(m);
    });
    VA.concat(HA, BA).forEach(function(p) {
      var m = p.a.mesh(p.m);
      m && bm.add(m);
    });
    bm.add(gmeshes);
    world.add(bm, spr);
    if (innerWidth > 820) {
      var mir = bm.clone();
      mir.scale.y = -1;
      world.add(mir);
    }
    var tw = new Group(), og = new MeshBasicMaterial({ color: new Color(2.4, 0.75, 0.2), fog: false }), wh = new MeshBasicMaterial({ color: new Color(1.7, 1.6, 1.5), fog: false });
    function bar(a, b, t, m) {
      var d = new Vector3().subVectors(b, a), l = d.length(), me = new Mesh(new BoxGeometry(t, l, t), m);
      me.position.copy(a).add(b).multiplyScalar(0.5);
      me.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), d.normalize());
      tw.add(me);
    }
    function leg(h0, w0, h1, w1, t, m) {
      [[1, 1], [-1, 1], [1, -1], [-1, -1]].forEach(function(q) {
        bar(new Vector3(q[0] * w0, h0, q[1] * w0), new Vector3(q[0] * w1, h1, q[1] * w1), t, m);
      });
    }
    function ring(y, w, t, m) {
      bar(new Vector3(-w, y, w), new Vector3(w, y, w), t, m);
      bar(new Vector3(-w, y, -w), new Vector3(w, y, -w), t, m);
      bar(new Vector3(w, y, -w), new Vector3(w, y, w), t, m);
      bar(new Vector3(-w, y, -w), new Vector3(-w, y, w), t, m);
    }
    leg(0, 40, 125, 17, 3.2, og);
    for (var yy = 22; yy < 120; yy += 26) {
      var f = 40 - (40 - 17) * yy / 125;
      ring(yy, f, 1.6, wh);
    }
    var dk1 = new Mesh(new BoxGeometry(40, 9, 40), og);
    dk1.position.y = 130;
    tw.add(dk1);
    var dk1b = new Mesh(new BoxGeometry(46, 3, 46), wh);
    dk1b.position.y = 136;
    tw.add(dk1b);
    leg(136, 13, 235, 3.5, 2, og);
    ring(170, 9, 1.2, wh);
    ring(205, 6, 1, wh);
    var dk2 = new Mesh(new BoxGeometry(14, 7, 14), og);
    dk2.position.y = 245;
    tw.add(dk2);
    bar(new Vector3(0, 248, 0), new Vector3(0, 333, 0), 2.2, wh);
    bar(new Vector3(0, 300, 0), new Vector3(0, 333, 0), 1.4, og);
    var g1 = new Sprite(avA);
    g1.scale.setScalar(26);
    g1.position.y = 333;
    tw.add(g1);
    var gl = new Sprite(new SpriteMaterial({ map: glow("rgba(255,190,120,1)", "rgba(255,110,40,.55)"), transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0.5, fog: false }));
    gl.scale.set(150, 380, 1);
    gl.position.y = 150;
    tw.add(gl);
    tw.scale.setScalar(0.165);
    tw.position.set(-6, 0, -250);
    scene.add(tw);
  })();
  var Cd = (() => {
    let n = document.createElement("canvas");
    n.width = 16, n.height = 64;
    let e = n.getContext("2d");
    e.fillStyle = "#c4101f", e.fillRect(0, 0, 16, 32), e.fillStyle = "#e8e6e1", e.fillRect(0, 32, 16, 32);
    let t = new CanvasTexture(n);
    return t.wrapS = t.wrapT = RepeatWrapping, t.repeat.set(1, 520 / 6), t.colorSpace = SRGBColorSpace, t.magFilter = NearestFilter, t;
  })(), Kd = (() => {
    let n = document.createElement("canvas");
    n.width = n.height = 64;
    let e = n.getContext("2d"), t = e.createRadialGradient(32, 32, 0, 32, 32, 32);
    return t.addColorStop(0, "rgba(255,255,255,1)"), t.addColorStop(0.18, "rgba(210,228,255,.8)"), t.addColorStop(1, "rgba(160,190,255,0)"), e.fillStyle = t, e.fillRect(0, 0, 64, 64), new CanvasTexture(n);
  })();
  [-1, 1].forEach((n) => {
    let e = new Mesh(new PlaneGeometry(0.9, 520, 1, 130), new MeshBasicMaterial({ map: Cd, color: 7829367 }));
    e.rotation.x = -Math.PI / 2, e.position.set(n * 9.6, 3e-3, 0), world.add(e);
    let t = new Mesh(new PlaneGeometry(0.16, 520, 1, 130), new MeshBasicMaterial({ color: 9079434 }));
    t.rotation.x = -Math.PI / 2, t.position.set(n * 8.6, 3e-3, 0), world.add(t);
    let f = new Mesh(new BoxGeometry(0.5, 1, 520, 1, 1, 130), new MeshStandardMaterial({ color: 1513500, roughness: 0.75 }));
    f.position.set(n * 14, 0.5, 0), world.add(f);
    let r = new Mesh(new PlaneGeometry(0.1, 520, 1, 130), new MeshBasicMaterial({ color: new Color(1.2, 0.08, 0.12), toneMapped: false }));
    r.rotation.x = -Math.PI / 2, r.position.set(n * 13.74, 1.01, 0), world.add(r);
  });
  var Qd = (() => {
    let n = document.createElement("canvas");
    n.width = n.height = 256;
    let e = n.getContext("2d"), t = e.createRadialGradient(128, 128, 18, 128, 128, 128);
    return t.addColorStop(0, "rgba(0,0,0,.9)"), t.addColorStop(0.55, "rgba(0,0,0,.4)"), t.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = t, e.fillRect(0, 0, 256, 256), new CanvasTexture(n);
  })(), la = new Mesh(new PlaneGeometry(6.4, 3.8), new MeshBasicMaterial({ map: Qd, transparent: true, depthWrite: false, opacity: 0.85 }));
  la.rotation.x = -Math.PI / 2;
  la.position.y = 3e-3;
  scene.add(la);
  var car = new Group();
  scene.add(car);
  var carMirror = new Group();
  scene.add(carMirror);
  var Bo = [], Yr = 0, P9 = [], Yo = false, Vs = [], qs = [], sf = { wing: /* @__PURE__ */ new Set(), upper: /* @__PURE__ */ new Set(), lower: /* @__PURE__ */ new Set(), alloy: /* @__PURE__ */ new Set(), caliper: /* @__PURE__ */ new Set(), tyre: /* @__PURE__ */ new Set() }, Fo = [], Fr = null, l9 = [], wheelRadius = 0.35, i9 = [-0.62, 0.62].map((n) => {
    let e = new SpotLight(16773344, 0, 8, 0.3, 0.5, 2);
    return e.position.set(n, 0.62, 2), e.target.position.set(n * 0.55, 0, 6.5), car.add(e, e.target), e;
  });
  function v9(n) {
    $("#lbar").style.transform = `scaleX(${n})`, $("#lnum").textContent = `LOADING ${Math.round(n * 100)}%`;
  }
  function $d() {
    return new Promise((n, e) => {
      v9(0.15), fetch(modelUrl).then((r) => {
        if (!r.ok) throw new Error("Model request failed: " + r.status);
        return r.arrayBuffer();
      }).then((t) => {
        v9(0.55), new GLTFLoader().parse(t, "", (f) => {
          let r = f.scene;
          if (car.add(r), r.traverse((s) => {
            if (s.name && s.name.startsWith("WheelSpin_") && Vs.push(s), !s.isMesh) return;
            let v = s.material;
            s.castShadow = !(v.transmission > 0), s.receiveShadow = true, (v.name === "paint_red" || v.name === "paint_red_part") && (qs.push(v), sf.lower.add(v)), v.name === "paint_black" && (qs.push(v), sf.upper.add(v)), v.name === "alloy" && sf.alloy.add(v), v.name === "wing_carbon" && sf.wing.add(v), v.name === "caliper_red" && sf.caliper.add(v), v.name === "tyre_sidewall" && sf.tyre.add(v), v.emissive && v.emissive.getHex() !== 0 && l9.push({ m: v, base: v.emissiveIntensity, name: v.name }), v.map && (v.map.anisotropy = 8), v.normalMap && (v.normalMap.anisotropy = 8);
          }), innerWidth > 820) {
            Zo(r, P9), Fr = r.getObjectByName("RearWing");
            let s = r.clone(true);
            Zo(s, P9, true);
            {
              let v = s.getObjectByName("RearWing");
              v && Fo.push(v);
            }
            s.scale.y = -1, carMirror.add(s), s.traverse((v) => {
              v.isMesh && (v.castShadow = false, v.receiveShadow = false), v.name && v.name.startsWith("WheelSpin_") && Bo.push(v);
            }), ground.material.transparent = true, ground.material.opacity = 0.87, ground.material.depthWrite = false, ground.renderOrder = 1;
          }
          if (Fr = Fr || r.getObjectByName("RearWing"), Vs[0]) {
            r.updateMatrixWorld(true);
            let s = new Box3().setFromObject(Vs[0]);
            wheelRadius = (s.max.y - s.min.y) / 2 || 0.35;
          }
          e3(sf.upper, "@lower"), qs.forEach(look), window.__paintInfo = qs.map((s) => ({ n: s.name, c: s.color.getHexString(), map: !!s.map })), v9(1), n();
        }, e);
      }).catch(e);
    });
  }
  function Zo(n, e, t) {
    car.updateMatrixWorld(true), ["L", "R"].forEach((f) => {
      let r = n.getObjectByName("Door_" + f);
      if (!r) return;
      let s = f === "L" ? 1 : -1;
      t || ["Door_Handle_" + f, "Mirror_Stalk_" + f, "Mirror_Housing_" + f, "Mirror_Glass_" + f, "Trim_Side" + f].forEach((i2) => {
        let u = n.getObjectByName(i2);
        u && r.attach(u);
      });
      let v = new Vector3(s * 0.93, -0.05, -0.36).normalize(), a = new Vector3(0, 0, -1.24), P = (i2) => {
        let u = a.clone().applyQuaternion(new Quaternion().setFromAxisAngle(v, i2));
        return u.x * s + u.y * 0.5;
      };
      e.push({ d: r, axis: v, sign: P(1) > P(-1) ? 1 : -1 });
    });
  }
  function eb() {
    let n = smoothstep(clamp(state.doorK));
    P9.forEach((e) => e.d.quaternion.setFromAxisAngle(e.axis, e.sign * 1.3 * n));
  }
  function Go() {
    let n = state.edition === "track" || Yo;
    Fr && Fr.visible !== n && (Fr.visible = n), Fo.forEach((e) => {
      e.visible !== n && (e.visible = n);
    });
  }
  var Rn = [{ az: 30, r: 8.6, h: 0.72, t: [0, 0.5, 0], fov: 30, ox: -0.2 }, { az: 90, r: 9.2, h: 0.62, t: [0, 0.5, 0], fov: 30, ox: -0.22 }, { az: 212, r: 5.4, h: 1.45, t: [0, 0.98, -2.05], fov: 34, ox: 0.32 }, { az: 64, r: 4.6, h: 0.45, t: [0.88, 0.38, 1.35], fov: 30, ox: -0.2 }, { az: 78, r: 5.6, h: 1.3, t: [0.2, 0.8, -0.1], fov: 34, ox: 0.34 }, { az: 335, r: 9.5, h: 6.4, t: [0, 0.35, 0], fov: 30, ox: -0.22 }, { az: 318, r: 8.8, h: 0.95, t: [0, 0.5, 0], fov: 30, ox: 0.27 }, { az: 24, r: 10.5, h: 0.7, t: [0, 0.55, 0], fov: 30, ox: -0.12 }], ua = Rn.length, state = { doorK: 0, doorT: 0, edition: "road", dist: 0, speed: 0, chap: 0, target: 0, px: 0, py: 0, t0: 0, arr: -1, arrDone: false, time: 0 };
  function tb(n, e, t) {
    let f = innerWidth / innerHeight, r = n.r * (f < 1 ? lerp(1, 2.4, clamp((1 - f) / 0.5)) : 1), s = (n.az + e + t.x * 3.2) * Math.PI / 180, v = n.h + t.y * 0.12;
    camera.position.set(n.t[0] + Math.sin(s) * r, v, n.t[2] + Math.cos(s) * r), camera.lookAt(n.t[0], n.t[1], n.t[2]), camera.fov = n.fov;
  }
  function fb(n) {
    let e = clamp(Math.floor(n), 0, ua - 1), t = Math.min(e + 1, ua - 1), f = smootherstep(clamp((n - e - 0.22) / 0.56)), r = Rn[e], s = Rn[t];
    return { az: lerp(r.az, s.az, f), r: lerp(r.r, s.r, f), h: lerp(r.h, s.h, f), fov: lerp(r.fov, s.fov, f), ox: lerp(r.ox, s.ox, f), t: [0, 1, 2].map((v) => lerp(r.t[v], s.t[v], f)) };
  }
  var En = [{ n: "ignite", d: 3, a: { p: [4.6, 0.45, 5.6], t: [0, 0.55, 0.3], f: 32 }, b: { p: [3.2, 0.65, 4.2], t: [0, 0.6, 0.2], f: 30 }, v: 0 }, { n: "wheel", d: 1.6, a: { p: [2.7, 0.3, 2.4], t: [0.9, 0.36, 1.35], f: 34 }, b: { p: [2.5, 0.32, -0.4], t: [0.9, 0.36, -1.2], f: 30 }, v: 50 }, { n: "front", d: 1.9, a: { p: [1.3, 0.26, 8.4], t: [0, 0.5, 0], f: 30 }, b: { p: [0.5, 0.3, 5.4], t: [0, 0.5, 0], f: 44 }, v: 58 }, { n: "side", d: 1.9, a: { p: [7, 0.55, 2.4], t: [0, 0.5, 0.4], f: 24 }, b: { p: [6.6, 0.6, -0.7], t: [0, 0.5, 0.1], f: 24 }, v: 62 }, { n: "rear", d: 2, a: { p: [2.8, 1.8, -7.4], t: [0, 0.6, 0], f: 38 }, b: { p: [1.4, 1.1, -5], t: [0, 0.6, 0.2], f: 46 }, v: 62 }, { n: "top", d: 1.3, a: { p: [1.4, 10, 2.2], t: [0, 0, 0.2], f: 30 }, b: { p: [0.6, 9.4, -1.8], t: [0, 0, 0.2], f: 30 }, v: 64 }], Gn = En.reduce((n, e) => (n.push(n.length ? n[n.length - 1] + En[n.length - 1].d : 0), n), []), o9 = Gn[Gn.length - 1] + En[En.length - 1].d;
  function nb(n) {
    let e = 0;
    for (; e < En.length - 1 && n >= Gn[e + 1]; ) e++;
    let t = En[e], f = n - Gn[e], r = ((q) => q + (smoothstep(q) - q) * 0.6)(clamp(f / t.d)), s = [0, 1, 2].map((o) => lerp(t.a.p[o], t.b.p[o], r)), v = [0, 1, 2].map((o) => lerp(t.a.t[o], t.b.t[o], r)), a = e > 0 ? En[e - 1].v : 0, P = lerp(a, t.v, smoothstep(clamp(f / (e === 1 ? 0.8 : 0.4)))), i2 = easeOutCubic(clamp((n - 0.5) / 0.9)) * (1 - smoothstep(clamp((n - 1.9) / 0.8))), u = 0;
    for (let o = 1; o < Gn.length; o++) n >= Gn[o] && (u = Math.max(u, 1 - (n - Gn[o]) / 0.16));
    return { p: s, tg: v, f: lerp(t.a.f, t.b.f, r) + P * 0.12, v: P, door: i2, flash: Math.max(0, u), i: e, lit: e === 0 ? smoothstep(clamp(n / 2)) : 1 };
  }
  var nt = { d: 70, T: 3.4, total: 6, p: 2.4 };
  function rb(n) {
    let e = clamp(n / nt.T), t = -nt.d * Math.pow(1 - e, nt.p), f = nt.d - -t, r = nt.d * nt.p / nt.T * Math.pow(1 - e, nt.p - 1), s = easeOutCubic(clamp(n / (nt.T + 0.9))), v = { az: lerp(14, Rn[0].az, s), r: lerp(7.6, Rn[0].r, s), h: lerp(0.3, Rn[0].h, s), fov: lerp(62, 30, s), ox: lerp(0, Rn[0].ox, s), t: [0, 0.5, lerp(t * 0.9, 0, smoothstep(clamp((e - 0.35) / 0.65)))] }, a = 0.022 * smoothstep(clamp(e * 1.4)) * (1 - smoothstep(clamp((e - 0.7) / 0.3)));
    n > nt.T && (a += -6e-3 * Math.exp(-(n - nt.T) * 3.2));
    let P = -0.42 * Math.pow(Math.sin(Math.PI * clamp((e - 0.12) / 0.88)), 1.3);
    return { z: t, dist: f, speed: r, pose: v, pitch: a, yaw: P, u: e };
  }
  var Ro = 0;
  function u9(n, e) {
    let t = e ? 0.55 : 1, f = e ? 1 : smoothstep(clamp((n - nt.T + 0.2) / 1.3));
    scene.environmentIntensity = e ? 1 : lerp(0.1, 1, smoothstep(clamp((n - 0.2) / 1) * 0.3 + f * 0.7)), vf.intensity = e ? 1.5 : lerp(0, 1.5, f), c9.intensity = e ? 0.4 : lerp(0, 0.4, f), i9.forEach((r) => r.intensity = e ? 0 : lerp(70, 0, smoothstep(clamp((n - nt.T) / 2)))), oa.opacity = e ? 0.38 : 0.95 * smoothstep(clamp(n / 0.5)) * (1 - smoothstep(clamp((n - nt.T) / 2)) * 0.6), Ro = e ? 0 : (1 - easeOutCubic(clamp((n - nt.T) / 2.6))) * 1.1, l9.forEach((r) => {
      r.m.emissiveIntensity = r.base * (r.name === "led_drl" || r.name === "projector" ? t : 1);
    }), bloomPass.strength = e ? 0.1 : lerp(0.22, 0.1, f);
  }
  var sb = (() => {
    let n = document.createElement("canvas");
    n.width = n.height = 64;
    let e = n.getContext("2d"), t = e.createRadialGradient(32, 32, 2, 32, 32, 32);
    return t.addColorStop(0, "rgba(255,255,255,.9)"), t.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = t, e.fillRect(0, 0, 64, 64), new CanvasTexture(n);
  })(), za = Array.from({ length: 48 }, () => {
    let n = new Sprite(new SpriteMaterial({ map: sb, color: 9342614, transparent: true, opacity: 0, depthWrite: false }));
    return n.visible = false, scene.add(n), { sp: n, life: 0, v: new Vector3(), max: 1 };
  }), vb = 0, a9 = 0;
  function ab(n, e, t, f) {
    let r = za[vb++ % za.length];
    r.life = r.max = 0.9 + Math.random() * 0.8, r.sp.position.set(n + (Math.random() - 0.5) * 0.3, e, t + (Math.random() - 0.5) * 0.3), r.sp.visible = true, r.v.set((Math.random() - 0.5) * 1.6, 0.4 + Math.random() * 0.5, f * 0.15 + (Math.random() - 0.5) * 0.6);
  }
  function Pb(n) {
    za.forEach((e) => {
      if (e.life <= 0) {
        e.sp.visible = false;
        return;
      }
      e.life -= n;
      let t = 1 - e.life / e.max;
      e.sp.position.addScaledVector(e.v, n), e.sp.scale.setScalar(0.5 + t * 2.4), e.sp.material.opacity = 0.2 * (1 - t) * Math.min(1, t * 8);
    });
  }
  var ib = (() => {
    let n = document.createElement("canvas");
    n.width = n.height = 64;
    let e = n.getContext("2d"), t = e.createRadialGradient(32, 32, 1, 32, 32, 32);
    return t.addColorStop(0, "rgba(255,240,200,1)"), t.addColorStop(0.25, "rgba(255,150,40,.9)"), t.addColorStop(1, "rgba(255,60,0,0)"), e.fillStyle = t, e.fillRect(0, 0, 64, 64), new CanvasTexture(n);
  })(), Ns = [-0.33, -0.15, 0.15, 0.33].map((n) => {
    let e = new Sprite(new SpriteMaterial({ map: ib, transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0 }));
    return e.position.set(n, 0.31, -2.42), car.add(e), e;
  }), z9 = $("#fx"), en = z9.getContext("2d"), ob = Array.from({ length: 70 }, () => ({ a: Math.random() * Math.PI * 2, r: 0.12 + Math.random() * 0.6, l: 0.4 + Math.random(), s: Math.random() }));
  function ub(n) {
    let e = z9.width = innerWidth, t = z9.height = innerHeight;
    if (en.clearRect(0, 0, e, t), n < 0.03) return;
    let f = e * 0.5, r = t * 0.52, s = Math.hypot(e, t) * 0.5;
    en.globalCompositeOperation = "lighter", en.lineCap = "round", ob.forEach((v) => {
      let a = s * (v.r + 0.12), P = a + s * 0.5 * n * v.l, i2 = Math.cos(v.a), u = Math.sin(v.a);
      en.strokeStyle = `rgba(255,${v.s > 0.6 ? 90 : 235},${v.s > 0.6 ? 100 : 230},${0.28 * n * (0.4 + v.s)})`, en.lineWidth = 1 + v.s * 1.6, en.beginPath(), en.moveTo(f + i2 * a, r + u * a), en.lineTo(f + i2 * P, r + u * P), en.stroke();
    });
  }
  var composer = new EffectComposer(renderer);
  composer.setPixelRatio(Jo);
  composer.addPass(new RenderPass(scene, camera));
  var bloomPass = new UnrealBloomPass(new Vector2(innerWidth, innerHeight), 0.12, 0.2, 1);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
  function Io() {
    let n = innerWidth, e = innerHeight;
    renderer.setSize(n, e, false), composer.setSize(n, e), camera.aspect = n / e, zb.style.height = ((ua - 1) * 1.15 + 1) * e + "px";
  }
  var zb = $("#spacer"), Ws = $$(".pn"), Uo = $("#rail"), cb = ["Start", "Silhouette", "Aero", "Wheels", "Cockpit", "Numbers", "Colour", "End"];
  cb.forEach((n, e) => {
    let t = document.createElement("button");
    t.type = "button", t.setAttribute("aria-label", n), t.innerHTML = `<span>${n}</span><i></i>`, t.onclick = () => b9(e), Uo.appendChild(t);
  });
  var lb = $$("button", Uo), d9 = () => innerHeight * 1.15;
  function b9(n) {
    scrollTo({ top: n * d9(), behavior: Dn ? "auto" : "smooth" });
  }
  $("#home").onclick = (n) => {
    n.preventDefault(), b9(0);
  };
  $("#top").onclick = () => b9(0);
  $("#again").onclick = $("#replay").onclick = () => {
    scrollTo({ top: 0, behavior: "auto" }), f3();
  };
  var Co = [["Rosso Vesper", "@lower"], ["Giallo Midas", "#ffe000"], ["Arancio", "#ff5a00"], ["Neon Pink", "#ff2d8a"], ["Verde Mantis", "#6fd108"], ["Viridian", "#0f6b4b"], ["Cyan Drift", "#12c2e9"], ["Azure Coast", "#1b4fb5"], ["Midnight", "#0c1f4a"], ["Violet Dusk", "#5a1d88"], ["Arctic Pearl", "#e9e8e4"], ["Silver", "#9a9da3"], ["Graphite", "#3a3c42"], ["Gloss Black", "#050506"]], Ko = [["Rosso Vesper", null], ["Giallo Midas", "#ffe000"], ["Arancio", "#ff5a00"], ["Neon Pink", "#ff2d8a"], ["Verde Mantis", "#6fd108"], ["Viridian", "#0f6b4b"], ["Cyan Drift", "#12c2e9"], ["Azure Coast", "#1b4fb5"], ["Midnight", "#0c1f4a"], ["Violet Dusk", "#5a1d88"], ["Arctic Pearl", "#e9e8e4"], ["Silver", "#9a9da3"], ["Graphite", "#3a3c42"], ["Gloss Black", "#050506"]], Qo = [["Silver", null], ["Gunmetal", "#2a2c30"], ["Gloss Black", "#0a0a0b"], ["Gold", "#b8923a"], ["Bronze", "#7a4a2a"], ["Crimson", "#b10f1f"]], _o = [["Red", null], ["Yellow", "#e2b007"], ["Blue", "#1b4fb5"], ["Orange", "#e0621a"], ["Silver", "#b9bcc2"], ["Black", "#111113"]], $o = [["Standard", null], ["Red band", "#7a0b14"], ["Yellow band", "#a88a05"], ["White", "#bdbdbd"]], Sr = /* @__PURE__ */ new Map();
  function e3(n, e) {
    n.forEach((t) => {
      if (Sr.has(t.uuid) || Sr.set(t.uuid, t.color.clone()), e === "@lower") {
        let f = [...sf.lower][0];
        f && !Sr.has(f.uuid) && Sr.set(f.uuid, f.color.clone()), t.color.copy(f ? Sr.get(f.uuid) : t.color);
      } else t.color.copy(e ? new Color(e) : Sr.get(t.uuid));
    });
  }
  var SAT = false;
  function look(t) {
    let s = SAT;
    t.metalness = s ? 0.3 : 0.04;
    t.roughness = s ? 0.52 : 0.22;
    t.clearcoat = s ? 0.15 : 1;
    t.clearcoatRoughness = s ? 0.6 : 0.02;
  }
  var BC = { u: null, l: null }, WO = /* @__PURE__ */ new Map();
  function wingSync() {
    var c = BC.u && BC.u !== "@lower" ? BC.u : BC.l;
    sf.wing.forEach(function(t) {
      if (!WO.has(t.uuid)) WO.set(t.uuid, { map: t.map, nm: t.normalMap, color: t.color.clone(), m: t.metalness, r: t.roughness, c: t.clearcoat, cr: t.clearcoatRoughness });
      var o = WO.get(t.uuid);
      if (c) {
        t.map = null;
        t.normalMap = null;
        t.color.set(c);
        look(t);
      } else {
        t.map = o.map;
        t.normalMap = o.nm;
        t.color.copy(o.color);
        t.metalness = o.m;
        t.roughness = o.r;
        t.clearcoat = o.c || 0;
        t.clearcoatRoughness = o.cr || 0;
      }
      t.needsUpdate = true;
    });
  }
  var Br = { u: Co[0][0], l: Ko[0][0], w: Qo[0][0], c: _o[0][0], t: $o[0][0] };
  function t3() {
    let n = $("#lname");
    n && (n.textContent = `${Br.u} / ${Br.l}`);
    let e = $("#wname");
    e && (e.textContent = `${Br.w} \xB7 ${Br.c} \xB7 ${Br.t}`);
  }
  function Ls(n, e, t, f) {
    e.forEach(([r, s], v) => {
      let a = document.createElement("button");
      a.type = "button", a.setAttribute("aria-label", r), a.title = r, a.setAttribute("aria-pressed", v === 0), a.style.setProperty("--c", s && s[0] !== "@" ? s : { u: "#c4101f", l: "#c4101f", w: "#aeb3bd", c: "#c4101f", t: "#1a1a1c" }[t]), a.onclick = () => {
        $$("button", n).forEach((P) => P.setAttribute("aria-pressed", P === a)), Br[t] = r, e3(f(), s), qs.forEach(look), (t === "u" || t === "l") && (BC[t] = s, wingSync()), t3();
      }, n.appendChild(a);
    });
  }
  Ls($("#swU"), Co, "u", () => sf.upper);
  Ls($("#swL"), Ko, "l", () => sf.lower);
  Ls($("#swW"), Qo, "w", () => sf.alloy);
  Ls($("#swC"), _o, "c", () => sf.caliper);
  Ls($("#swT"), $o, "t", () => sf.tyre);
  t3();
  function db(n) {
    let e = $$("button", $("#swL"))[n];
    e && e.click();
  }
  function da(n, e) {
    $$("button", n).forEach((t) => t.onclick = () => {
      $$("button", n).forEach((f) => f.setAttribute("aria-pressed", f === t)), e(t.dataset.v);
    });
  }
  da($("#fin"), (n) => {
    SAT = n === "satin", qs.forEach(look), wingSync();
  });
  da($("#tabs"), (n) => $$(".tp").forEach((e) => e.hidden = e.dataset.tab !== n));
  da($("#doors"), (n) => {
    state.doorT = n === "open" ? 1 : 0;
  });
  da($("#lights"), (n) => {
    LIT.on = n === "on";
  });
  da($("#edition"), (n) => {
    let e = n === "track";
    state.edition = n, Go(), $("#edinfo").textContent = e ? "Dual-element carbon wing, front splitter and diffuser." : "Clean rear deck without the wing. Same body, quieter look.";
  });
  var Lo = /* @__PURE__ */ new WeakSet();
  function bb(n) {
    $$("[data-count]", n).forEach((e) => {
      if (Lo.has(e)) return;
      Lo.add(e);
      let t = parseFloat(e.dataset.count), f = +e.dataset.dec || 0, r = e.querySelector("u").outerHTML, s = performance.now(), v = (a) => {
        let P = Dn ? 1 : clamp((a - s) / 1400);
        e.innerHTML = (t * easeOutCubic(P)).toFixed(f) + r, P < 1 && requestAnimationFrame(v);
      };
      requestAnimationFrame(v);
    });
  }
  function pb(n) {
    Ws.forEach((t) => {
      let f = +t.dataset.i, r = n - f, s = Math.abs(r), v = smoothstep(clamp(1 - (s - 0.18) / 0.3));
      t.style.opacity = v.toFixed(3), t.style.visibility = v > 0.01 ? "visible" : "hidden", t.style.pointerEvents = v > 0.6 ? "auto" : "none", t.style.transform = `translate3d(0,${(r * -34).toFixed(1)}px,0)` + (innerWidth > 820 && !t.classList.contains("low") ? " translateY(-50%)" : ""), v > 0.7 && f === 5 && bb(t);
    });
    let e = Math.round(n);
    lb.forEach((t, f) => t.classList.toggle("on", f === e)), $("#hint").style.opacity = state.arrDone && n < 0.35 ? 1 : 0;
  }
  var gs = { x: 0, y: 0 }, ca = { x: 0, y: 0 };
  addEventListener("pointermove", (n) => {
    ca.x = n.clientX / innerWidth - 0.5, ca.y = n.clientY / innerHeight - 0.5;
  }, { passive: true });
  addEventListener("resize", Io);
  Io();
  var BEND = { value: new Float32Array(14) }, BK = 26e-4;
  function bendify(m) {
    if (!m || m.__b) return;
    m.__b = 1;
    m.onBeforeCompile = function(sh) {
      sh.uniforms.uC = BEND;
      var fn = "uniform float uC[14];\nfloat bendX(float z){if(z<=0.0)return 0.0;float x=0.0;for(int i=0;i<14;i++){float a=float(i)*20.0;if(z>a){float b=(i==13)?z:min(z,a+20.0);x+=uC[i]*(z*(b-a)-(b+a)*(b-a)*0.5);}}return x;}\n";
      var v = sh.vertexShader.replace("#include <common>", "#include <common>\n" + fn);
      if (v.indexOf("#include <project_vertex>") >= 0) v = v.replace("#include <project_vertex>", "vec4 bw=modelMatrix*vec4(transformed,1.0);bw.x+=bendX(bw.z);vec4 mvPosition=viewMatrix*bw;gl_Position=projectionMatrix*mvPosition;");
      else v = v.replace("vec4 mvPosition = modelViewMatrix[ 3 ];", "vec4 bw=modelMatrix[3];bw.x+=bendX(bw.z);vec4 mvPosition=viewMatrix*bw;");
      sh.vertexShader = v;
    };
  }
  function bendJS(z) {
    if (z <= 0) return 0;
    var x = 0;
    for (var i2 = 0; i2 < 14; i2++) {
      var a = i2 * 20;
      if (z > a) {
        var b = i2 == 13 ? z : Math.min(z, a + 20);
        x += BEND.value[i2] * (z * (b - a) - (b + a) * (b - a) * 0.5);
      }
    }
    return x;
  }
  function curv(q) {
    var c = 1.35 * Math.sin(q * 0.0105) + 0.6 * Math.sin(q * 43e-4 + 1);
    c = Math.max(-1, Math.min(1, c));
    var a = Math.abs(c);
    c = a < 0.2 ? 0 : (c < 0 ? -1 : 1) * (a - 0.2) / 0.8;
    return c * Math.min(1, q / 250) * BK;
  }
  var rc = document.createElement("canvas");
  rc.width = 256;
  rc.height = 64;
  var rx = rc.getContext("2d");
  rx.fillStyle = "#1d1d23";
  rx.fillRect(0, 0, 256, 64);
  for (var i = 0; i < 2500; i++) {
    rx.fillStyle = "rgba(" + (Math.random() < 0.5 ? "255,255,255" : "0,0,0") + "," + (Math.random() * 0.06).toFixed(3) + ")";
    rx.fillRect(Math.random() * 256, Math.random() * 64, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  [-4.5, -1.5, 1.5, 4.5].forEach(function(x) {
    rx.fillStyle = "rgba(235,235,225,.85)";
    rx.fillRect(256 * (x + 8.9) / 17.8 - 1.5, 0, 3, 32);
  });
  var RT = new CanvasTexture(rc);
  RT.wrapS = RT.wrapT = RepeatWrapping;
  RT.repeat.set(1, 520 / 6);
  RT.colorSpace = SRGBColorSpace;
  RT.anisotropy = 8;
  var road = new Mesh(new PlaneGeometry(17.8, 520, 1, 130), new MeshBasicMaterial({ map: RT, transparent: true, opacity: 0.9, depthWrite: false, color: new Color(0.9, 0.9, 0.9) }));
  road.rotation.x = -Math.PI / 2;
  road.position.y = 2e-3;
  road.renderOrder = 5;
  world.add(road);
  world.traverse(function(o) {
    if (o.material) bendify(o.material);
  });
  var RP = { W: 4.6, L: 10, H: 1.5 }, BXC = {};
  function bx(w, h, d) {
    var k = w + "_" + h + "_" + d;
    return BXC[k] || (BXC[k] = new BoxGeometry(w, h, d));
  }
  function sm(c, e) {
    var m = new MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.15, emissive: new Color(c).multiplyScalar(e) });
    bendify(m);
    return m;
  }
  function gmt(r, g, b) {
    var m = new MeshBasicMaterial({ color: new Color(r, g, b), toneMapped: false });
    bendify(m);
    return m;
  }
  var M = { orange: sm(16738816, 0.55), white: sm(15790320, 0.45), conc: sm(11076512, 0.3), dark: sm(1380122, 0.15), glass: sm(724500, 0.1), red: gmt(3, 0.2, 0.2), amber: gmt(3, 1.6, 0.2), pink: gmt(3, 0.5, 2.4) }, CC = [15264490, 10133672, 2030190, 8000528, 2237480, 14267392].map(function(c) {
    return sm(c, 0.3);
  });
  function mb_(geo, m, x, y, z, g) {
    var me = new Mesh(geo, m);
    me.position.set(x, y, z);
    me.frustumCulled = false;
    g.add(me);
    return me;
  }
  function mkCone() {
    var g = new Group();
    mb_(bx(0.5, 0.05, 0.5), M.dark, 0, 0.025, 0, g);
    mb_(bx(0.36, 0.32, 0.36), M.orange, 0, 0.21, 0, g);
    mb_(bx(0.24, 0.3, 0.24), M.orange, 0, 0.5, 0, g);
    mb_(bx(0.4, 0.07, 0.4), M.white, 0, 0.3, 0, g);
    g.scale.setScalar(1.3);
    return g;
  }
  function mkCones(n) {
    var g = new Group();
    for (var i2 = 0; i2 < n; i2++) {
      var c = mkCone();
      c.position.x = (i2 - (n - 1) / 2) * 0.95;
      g.add(c);
    }
    return g;
  }
  function mkBarrier() {
    var g = new Group();
    mb_(bx(2.6, 0.35, 0.7), M.conc, 0, 0.175, 0, g);
    mb_(bx(2.6, 0.35, 0.46), M.conc, 0, 0.525, 0, g);
    mb_(bx(2.6, 0.3, 0.3), M.conc, 0, 0.85, 0, g);
    mb_(bx(2.62, 0.07, 0.34), M.amber, 0, 1.02, 0, g);
    mb_(bx(2.62, 0.06, 0.72), M.pink, 0, 0.36, 0, g);
    return g;
  }
  function mkCar() {
    var g = new Group(), c = CC[Math.random() * CC.length | 0];
    mb_(bx(1.85, 0.6, 4.3), c, 0, 0.55, 0, g);
    mb_(bx(1.55, 0.5, 2.2), M.glass, 0, 1.1, -0.25, g);
    mb_(bx(1.56, 0.08, 2.2), c, 0, 1.38, -0.25, g);
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function(p) {
      mb_(bx(0.25, 0.55, 0.6), M.dark, p[0] * 0.95, 0.3, p[1] * 1.4, g);
    });
    [-0.6, 0.6].forEach(function(x) {
      mb_(bx(0.5, 0.14, 0.08), M.red, x, 0.72, -2.16, g);
    });
    return g;
  }
  var chev = (function() {
    var c = document.createElement("canvas");
    c.width = c.height = 128;
    var x = c.getContext("2d");
    x.fillStyle = "#0a0a12";
    x.fillRect(0, 0, 128, 128);
    x.strokeStyle = "#19e6ff";
    x.lineWidth = 13;
    x.shadowColor = "#19e6ff";
    x.shadowBlur = 12;
    x.lineJoin = "miter";
    for (var i2 = 0; i2 < 3; i2++) {
      var y = 18 + i2 * 38;
      x.beginPath();
      x.moveTo(14, y + 28);
      x.lineTo(64, y);
      x.lineTo(114, y + 28);
      x.stroke();
    }
    var t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    return t;
  })();
  var RTop = new MeshBasicMaterial({ map: chev, color: new Color(1.5, 1.5, 1.5), side: DoubleSide }), RSide = new MeshBasicMaterial({ color: 1380122, side: DoubleSide });
  bendify(RTop);
  bendify(RSide);
  function mkRamp() {
    var g = new Group(), W = RP.W / 2, L = RP.L, H = RP.H;
    var t = new BufferGeometry();
    t.setAttribute("position", new Float32BufferAttribute([-W, 0, 0, W, 0, 0, W, H, L, -W, H, L], 3));
    t.setAttribute("uv", new Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
    t.setIndex([0, 1, 2, 0, 2, 3]);
    var sd = new BufferGeometry();
    sd.setAttribute("position", new Float32BufferAttribute([-W, 0, 0, -W, 0, L, -W, H, L, W, 0, 0, W, 0, L, W, H, L, -W, 0, L, W, 0, L, W, H, L, -W, H, L], 3));
    sd.setIndex([0, 1, 2, 3, 5, 4, 6, 7, 8, 6, 8, 9]);
    var a = new Mesh(t, RTop), b = new Mesh(sd, RSide);
    a.frustumCulled = b.frustumCulled = false;
    g.add(a, b);
    mb_(bx(RP.W, 0.1, 0.4), M.pink, 0, H, L - 0.2, g);
    mb_(bx(0.1, 0.1, L), M.pink, -W, H * 0.5, L / 2, g).rotation.x = -Math.atan2(H, L);
    mb_(bx(0.1, 0.1, L), M.pink, W, H * 0.5, L / 2, g).rotation.x = -Math.atan2(H, L);
    return g;
  }
  var DRV = { on: false, v: 0, x: 0, y: 0, vy: 0, air: false, airT: 0, wasR: false, dv: 0, yaw: 0, roll: 0, pitch: 0, steer: 0, d: 0, d0: 0, wh: 0, cx: 0, jr: 0, sm: 0, sy: 0, k: {}, acc: 0, fov: 52, obs: [], next: 0, jumps: 0, hits: 0, score: 0, hitT: 0, cam: 0, dead: false, deadT: 0, best: 0, sw: null };
  function toast(t) {
    var e = document.getElementById("toast");
    if (!e) return;
    e.textContent = t;
    e.style.opacity = 1;
    clearTimeout(toast.t);
    toast.t = setTimeout(function() {
      e.style.opacity = 0;
    }, 1e3);
  }
  DRV.place = function(t, x, q, u) {
    var g = t === "ramp" ? mkRamp() : t === "cones" ? mkCones(3 + (Math.random() * 3 | 0)) : t === "barrier" ? mkBarrier() : mkCar(), o = { t, g, s: q, x, u: u || 0, w: t === "ramp" ? RP.W : t === "cones" ? g.children.length * 0.95 : t === "barrier" ? 2.6 : 1.9, l: t === "ramp" ? RP.L : t === "cones" ? 0.7 : t === "barrier" ? 0.7 : 4.3, h: t === "ramp" ? 0 : t === "cones" ? 0.8 : t === "barrier" ? 1.05 : 1.45, fly: false };
    g.position.set(x, 0, q - DRV.d);
    scene.add(g);
    DRV.obs.push(o);
    return o;
  };
  DRV.spawnAt = function(q) {
    var r = Math.random(), lane = [-6, -3, 0, 3, 6][Math.random() * 5 | 0];
    if (r < 0.34) {
      var rx_ = Math.random() * 9 - 4.5;
      DRV.place("ramp", rx_, q, 0);
      if (Math.random() < 0.6) {
        var hs = q + RP.L + 30 + Math.random() * 12;
        DRV.place(Math.random() < 0.5 ? "car" : "barrier", rx_, hs, 0);
      }
    } else if (r < 0.52) DRV.place("cones", lane, q, 0);
    else if (r < 0.7) {
      DRV.place("barrier", lane, q, 0);
      if (Math.random() < 0.5) DRV.place("barrier", Math.max(-6, Math.min(6, lane + (lane > 0 ? -3 : 3))), q, 0);
    } else if (r < 0.9) {
      var n = 2 + (Math.random() * 2 | 0), ls = [-6, -3, 0, 3, 6].sort(function() {
        return Math.random() - 0.5;
      });
      for (var i2 = 0; i2 < n; i2++) DRV.place("car", ls[i2], q + Math.random() * 25, 14 + Math.random() * 12);
    } else {
      var gap = Math.random() * 5 | 0;
      [-6, -3, 0, 3, 6].forEach(function(x, i3) {
        if (i3 !== gap) DRV.place("barrier", x, q, 0);
      });
    }
  };
  DRV.clear = function() {
    DRV.obs.forEach(function(o) {
      scene.remove(o.g);
    });
    DRV.obs = [];
  };
  DRV.enter = function() {
    if (DRV.on) return;
    if (!state.arrDone) Gr();
    DRV.sy = scrollY;
    DRV.d = state.dist;
    DRV.d0 = DRV.d;
    DRV.wh = (nt.d + state.dist) / wheelRadius;
    DRV.v = 0;
    DRV.x = 0;
    DRV.y = 0;
    DRV.vy = 0;
    DRV.air = false;
    DRV.dv = 0;
    DRV.cx = 0;
    DRV.yaw = 0;
    DRV.roll = 0;
    DRV.pitch = 0;
    DRV.steer = 0;
    DRV.k = {};
    DRV.jumps = 0;
    DRV.hits = 0;
    DRV.score = 0;
    DRV.hitT = 0;
    DRV.dead = false;
    document.body.classList.remove("dead");
    DRV.clear();
    DRV.next = DRV.d + 260;
    state.doorT = 0;
    DRV.on = true;
    document.body.classList.add("driving");
  };
  DRV.exit = function() {
    if (!DRV.on) return;
    DRV.on = false;
    DRV.dead = false;
    document.body.classList.remove("dead");
    if (DRV.sw) DRV.sw.rotation.z = 0;
    DRV.ckSync(0, true);
    DRV.clear();
    BEND.value.fill(0);
    state.dist = DRV.d;
    state.speed = 0;
    DRV.x = 0;
    DRV.y = 0;
    DRV.roll = 0;
    DRV.pitch = 0;
    DRV.yaw = 0;
    DRV.k = {};
    document.body.classList.remove("driving");
    scrollTo(0, DRV.sy);
  };
  function rotE(x, y, z) {
    var cr = Math.cos(DRV.roll), sr = Math.sin(DRV.roll), x1 = x * cr - y * sr, y1 = x * sr + y * cr, cy = Math.cos(DRV.yaw), sy = Math.sin(DRV.yaw), x2 = x1 * cy + z * sy, z2 = -x1 * sy + z * cy, cp = Math.cos(DRV.pitch), sp = Math.sin(DRV.pitch);
    return [x2, y1 * cp - z2 * sp, y1 * sp + z2 * cp];
  }
  DRV.restart = function() {
    DRV.clear();
    document.body.classList.remove("dead");
    DRV.d = DRV.d0;
    DRV.v = 0;
    DRV.x = 0;
    DRV.y = 0;
    DRV.vy = 0;
    DRV.air = false;
    DRV.wasR = false;
    DRV.dv = 0;
    DRV.cx = 0;
    DRV.yaw = 0;
    DRV.roll = 0;
    DRV.pitch = 0;
    DRV.steer = 0;
    DRV.jumps = 0;
    DRV.hits = 0;
    DRV.score = 0;
    DRV.hitT = 0;
    DRV.dead = false;
    DRV.deadT = 0;
    DRV.next = DRV.d + 260;
    DRV.wh = (nt.d + DRV.d) / wheelRadius;
    BEND.value.fill(0);
  };
  var LIT = { on: true, t: 1 };
  LIT.apply = function() {
    var drv = DRV.on;
    LIT.t += ((LIT.on ? 1 : 0) - LIT.t) * 0.2;
    i9.forEach(function(l) {
      var sd = l.position.x > 0 ? 1 : -1;
      l.intensity = LIT.t * (drv ? 95 : 50);
      l.distance = drv ? 30 : 8;
      l.angle = drv ? 0.42 : 0.3;
      l.target.position.set(sd * 0.4, 0, drv ? 12 : 6.5);
    });
    l9.forEach(function(r) {
      var n = r.name, k = n === "led_drl" || n === "projector" ? 0.12 + LIT.t * (drv ? 2.4 : 1.7) : /taillight|indicator/.test(n) ? 0.35 + LIT.t * (drv ? 2 : 1.3) : 1;
      r.m.emissiveIntensity = r.base * k;
    });
  };
  DRV.toggleLights = function() {
    LIT.on = !LIT.on;
    document.querySelectorAll("#lights button").forEach(function(b) {
      b.setAttribute("aria-pressed", b.dataset.v === (LIT.on ? "on" : "off"));
    });
  };
  (function() {
    var G = null, CKW = null, DT = null, dctx = null, built = false, lastDraw = 0, L = { lastD: 0, t: 0, start: 0, last: null, best: null, lap: 1 }, TK = [], hs = {};
    function cv(w, h) {
      var c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      return c;
    }
    function tx(c, rx2, ry) {
      var t = new CanvasTexture(c);
      t.wrapS = t.wrapT = RepeatWrapping;
      t.colorSpace = SRGBColorSpace;
      t.anisotropy = 8;
      if (rx2) t.repeat.set(rx2, ry);
      return t;
    }
    function carbonTex() {
      var c = cv(128, 128), x = c.getContext("2d");
      x.fillStyle = "#07070a";
      x.fillRect(0, 0, 128, 128);
      for (var j = 0; j < 16; j++) for (var i2 = 0; i2 < 16; i2++) {
        var u = i2 + j >> 1 & 1, g = x.createLinearGradient(i2 * 8, j * 8, i2 * 8 + 8, j * 8 + 8);
        g.addColorStop(0, u ? "#4a4a52" : "#101014");
        g.addColorStop(1, u ? "#202026" : "#34343c");
        x.fillStyle = g;
        x.fillRect(i2 * 8, j * 8, 8, 8);
        x.fillStyle = "rgba(0,0,0,.5)";
        x.fillRect(i2 * 8, j * 8, 8, 1);
        x.fillRect(i2 * 8, j * 8, 1, 8);
      }
      return tx(c, 5, 5);
    }
    function alcTex() {
      var c = cv(128, 128), x = c.getContext("2d");
      x.fillStyle = "#141416";
      x.fillRect(0, 0, 128, 128);
      for (var i2 = 0; i2 < 5e3; i2++) {
        x.fillStyle = "rgba(" + (Math.random() < 0.5 ? "255,255,255" : "0,0,0") + "," + (Math.random() * 0.12).toFixed(3) + ")";
        x.fillRect(Math.random() * 128, Math.random() * 128, 1, 1 + Math.random() * 2);
      }
      return tx(c, 3, 3);
    }
    function rbox(w, h, d, r, s) {
      s = s || 6;
      var g = new BoxGeometry(w, h, d, s, s, s), p = g.attributes.position, n = g.attributes.normal, hw = w / 2 - r, hh = h / 2 - r, hd = d / 2 - r, v = new Vector3();
      for (var i2 = 0; i2 < p.count; i2++) {
        var x = p.getX(i2), y = p.getY(i2), z = p.getZ(i2), cx = Math.max(-hw, Math.min(hw, x)), cy = Math.max(-hh, Math.min(hh, y)), cz = Math.max(-hd, Math.min(hd, z));
        v.set(x - cx, y - cy, z - cz);
        var l = v.length();
        if (l > 1e-6) {
          n.setXYZ(i2, v.x / l, v.y / l, v.z / l);
          v.multiplyScalar(r / l);
        }
        p.setXYZ(i2, cx + v.x, cy + v.y, cz + v.z);
      }
      return g;
    }
    function cr(P, n) {
      var out = [], m = P.length - 1;
      for (var i2 = 0; i2 < n; i2++) {
        var u = i2 / (n - 1) * m, k = Math.min(m - 1, Math.floor(u)), t = u - k, p0 = P[Math.max(0, k - 1)], p1 = P[k], p2 = P[k + 1], p3 = P[Math.min(m, k + 2)], t2 = t * t, t32 = t2 * t;
        out.push([0, 1, 2].map(function(a) {
          return 0.5 * (2 * p1[a] + (-p0[a] + p2[a]) * t + (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * t2 + (-p0[a] + 3 * p1[a] - 3 * p2[a] + p3[a]) * t32);
        }));
      }
      return out;
    }
    function tube(P, n, prof, up, seg) {
      var S = cr(P, n), pos = [], nor = [], idx = [], u = up || [0, 0, 1], i2, j;
      for (i2 = 0; i2 < n; i2++) {
        var a = S[Math.max(0, i2 - 1)], b = S[Math.min(n - 1, i2 + 1)], T = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], tl = Math.hypot(T[0], T[1], T[2]);
        T = T.map(function(q) {
          return q / tl;
        });
        var B = [T[1] * u[2] - T[2] * u[1], T[2] * u[0] - T[0] * u[2], T[0] * u[1] - T[1] * u[0]], bl = Math.hypot(B[0], B[1], B[2]);
        B = B.map(function(q) {
          return q / bl;
        });
        var pr = prof(i2 / (n - 1)), rx2 = pr[0], ry = pr[1];
        for (j = 0; j <= seg; j++) {
          var an = j / seg * Math.PI * 2, c = Math.cos(an), s2 = Math.sin(an);
          pos.push(S[i2][0] + B[0] * c * rx2 + u[0] * s2 * ry, S[i2][1] + B[1] * c * rx2 + u[1] * s2 * ry, S[i2][2] + B[2] * c * rx2 + u[2] * s2 * ry);
          var nx = B[0] * c / rx2 + u[0] * s2 / ry, ny = B[1] * c / rx2 + u[1] * s2 / ry, nz = B[2] * c / rx2 + u[2] * s2 / ry, nl = Math.hypot(nx, ny, nz);
          nor.push(nx / nl, ny / nl, nz / nl);
        }
      }
      for (i2 = 0; i2 < n - 1; i2++) for (j = 0; j < seg; j++) {
        var a0 = i2 * (seg + 1) + j, b0 = a0 + seg + 1;
        idx.push(a0, b0, a0 + 1, b0, b0 + 1, a0 + 1);
      }
      var g = new BufferGeometry();
      g.setAttribute("position", new Float32BufferAttribute(pos, 3));
      g.setAttribute("normal", new Float32BufferAttribute(nor, 3));
      g.setIndex(idx);
      return g;
    }
    function add(g, geo, m, x, y, z, rx2, ry, rz) {
      var me = new Mesh(geo, m);
      me.position.set(x, y, z);
      if (rx2 || ry || rz) me.rotation.set(rx2 || 0, ry || 0, rz || 0);
      g.add(me);
      return me;
    }
    function build() {
      built = true;
      var PHY = qs[0].constructor, UP = [0, 1, 0];
      var carbon = new PHY({ map: carbonTex(), roughness: 0.3, metalness: 0.4, clearcoat: 1, clearcoatRoughness: 0.04, side: DoubleSide }), alc = new PHY({ map: alcTex(), color: 11184810, roughness: 0.95, metalness: 0, sheen: 1, sheenRoughness: 0.55, side: DoubleSide }), red = new PHY({ color: 9046037, roughness: 0.22, metalness: 0.5, clearcoat: 1, clearcoatRoughness: 0.03, side: DoubleSide }), leather = new PHY({ color: 8130066, roughness: 0.5, metalness: 0, clearcoat: 0.3, side: DoubleSide }), metal = new PHY({ color: 5855577, roughness: 0.4, metalness: 1, side: DoubleSide }), gloss = new PHY({ color: channel(), roughness: 0.12, metalness: 0.2, clearcoat: 1, side: DoubleSide }), gR = new MeshBasicMaterial({ color: new Color(3, 0.12, 0.16), toneMapped: false }), gG = new MeshBasicMaterial({ color: new Color(1.1, 3, 0.2), toneMapped: false }), gW = new MeshBasicMaterial({ color: new Color(2, 2, 2.2), toneMapped: false });
      function channel() {
        return 1052688;
      }
      G = new Group();
      G.visible = false;
      car.add(G);
      add(G, rbox(1.46, 0.075, 0.5, 0.035), carbon, 0, 0.64, 0.52);
      add(G, tube([[-0.68, 0.683, 0.272], [-0.3, 0.686, 0.262], [0.3, 0.686, 0.262], [0.68, 0.683, 0.272]], 40, function() {
        return [35e-4, 35e-4];
      }, UP, 6), leather, 0, 0, 0);
      add(G, tube([[-0.62, 0.667, 0.255], [-0.3, 0.668, 0.249], [0.3, 0.668, 0.249], [0.62, 0.667, 0.255]], 40, function() {
        return [22e-4, 22e-4];
      }, UP, 6), gG, 0, 0, 0);
      var gl = cv(64, 64), gx = gl.getContext("2d"), gg = gx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gg.addColorStop(0, "rgba(120,255,60,.9)");
      gg.addColorStop(0.4, "rgba(60,200,40,.35)");
      gg.addColorStop(1, "rgba(0,0,0,0)");
      gx.fillStyle = gg;
      gx.fillRect(0, 0, 64, 64);
      var spill = add(G, new PlaneGeometry(0.8, 0.5), new MeshBasicMaterial({ map: tx(gl), transparent: true, depthWrite: false, blending: AdditiveBlending, opacity: 0.55, toneMapped: false }), 0, 0.696, 0.42, -Math.PI / 2);
      var dcv = cv(256, 160);
      dctx = dcv.getContext("2d");
      DT = tx(dcv);
      add(G, rbox(0.25, 0.18, 0.03, 0.012), gloss, 0, 0.735, 0.335, 0.7);
      add(G, new PlaneGeometry(0.215, 0.14), new MeshBasicMaterial({ map: DT, color: new Color(1.5, 1.5, 1.5), toneMapped: false, side: DoubleSide }), 0, 0.741, 0.318, 0.7);
      var vis = add(G, tube([[-0.13, 0, 0], [-0.115, 0.07, 0], [0, 0.1, 0], [0.115, 0.07, 0], [0.13, 0, 0]], 30, function() {
        return [0.011, 9e-3];
      }, [0, 0, 1], 8), carbon, 0, 0.72, 0.35, 0.7);
      [1, -1].forEach(function(sd) {
        add(G, rbox(0.44, 0.03, 0.9, 0.014), carbon, sd * 0.58, 0.49, 0.4, 0, 0, -sd * 0.4);
        add(G, rbox(0.4, 0.02, 0.84, 0.01), red, sd * 0.575, 0.505, 0.4, 0, 0, -sd * 0.4);
        for (var i2 = 0; i2 < 6; i2++) add(G, rbox(0.2, 0.012, 0.026, 5e-3, 3), carbon, sd * 0.62, 0.515 - -0.02, 0.12 + i2 * 0.075, 0, 0, -sd * 0.4);
        add(G, tube([[sd * 0.37, 0.56, -0.03], [sd * 0.37, 0.56, 0.4], [sd * 0.37, 0.56, 0.85]], 24, function() {
          return [3e-3, 3e-3];
        }, UP, 6), gG, 0, 0, 0);
        add(G, rbox(0.1, 0.5, 1.3, 0.03), carbon, sd * 0.69, 0.52, 0.05);
        add(G, rbox(0.07, 0.05, 0.5, 0.02), leather, sd * 0.655, 0.62, 0);
        add(G, tube([[sd * 0.62, 0.52, -0.35], [sd * 0.62, 0.52, 0.2], [sd * 0.62, 0.52, 0.7]], 20, function() {
          return [3e-3, 3e-3];
        }, UP, 6), gR, 0, 0, 0);
        add(G, rbox(0.1, 0.2, 0.55, 0.035), alc, sd * 0.26, 0.37, -0.22);
        add(G, rbox(0.012, 0.16, 0.5, 5e-3), leather, sd * 0.21, 0.38, -0.22);
      });
      add(G, rbox(1.4, 0.02, 1.5, 0.01), carbon, 0, 0.27, 0.1);
      add(G, rbox(0.24, 0.2, 1.15, 0.035), carbon, 0, 0.38, 0);
      add(G, tube([[0, 0.486, -0.5], [0, 0.486, 0], [0, 0.486, 0.55]], 30, function() {
        return [0.016, 5e-3];
      }, UP, 6), gR, 0, 0, 0);
      [1, -1].forEach(function(sd) {
        add(G, tube([[sd * 0.15, 0.282, 0.7], [sd * 0.3, 0.282, 0.35], [sd * 0.34, 0.282, -0.05], [sd * 0.28, 0.282, -0.45]], 40, function() {
          return [4e-3, 3e-3];
        }, UP, 6), gG, 0, 0, 0);
      });
      add(G, rbox(0.24, 0.032, 0.05, 0.012), carbon, 0, 1.04, 0.2);
      [-0.07, 0, 0.07].forEach(function(x) {
        add(G, rbox(0.034, 0.012, 0.014, 5e-3), gR, x, 1.024, 0.173);
      });
      CKW = new Group();
      CKW.position.set(0, 0.655, 0.17);
      CKW.rotation.x = 0.3;
      CKW.scale.setScalar(0.78);
      G.add(CKW);
      var YP = [[-0.19, 0.165, 0], [-0.205, 0.1, 0], [-0.212, 0.03, 0], [-0.2, -0.035, 0], [-0.168, -0.088, 0], [-0.115, -0.122, 0], [-0.05, -0.138, 0], [0, -0.141, 0], [0.05, -0.138, 0], [0.115, -0.122, 0], [0.168, -0.088, 0], [0.2, -0.035, 0], [0.212, 0.03, 0], [0.205, 0.1, 0], [0.19, 0.165, 0]];
      add(CKW, tube(YP, 160, function(t) {
        var g = Math.abs(t - 0.5) * 2, k = Math.max(0, (g - 0.6) / 0.4);
        return [0.0105 + 8e-3 * k, 0.0155 + 8e-3 * k];
      }, [0, 0, 1], 14), alc, 0, 0, 0);
      add(CKW, tube(YP.map(function(p) {
        return [p[0] * 0.93, p[1] * 0.93 + 4e-3, 0];
      }), 160, function() {
        return [16e-4, 16e-4];
      }, [0, 0, 1], 6), gR, 0, 0, 0.012);
      add(CKW, tube([[-0.06, -0.142, 0], [0, -0.145, 0], [0.06, -0.142, 0]], 14, function() {
        return [0.012, 0.0185];
      }, [0, 0, 1], 10), leather, 0, 0, 0);
      add(CKW, rbox(0.012, 0.03, 0.014, 4e-3, 3), gR, 0, -0.146, 0.02);
      [1, -1].forEach(function(sd) {
        add(CKW, rbox(0.026, 0.03, 0.024, 8e-3), gR, sd * 0.196, 0.178, 4e-3);
        add(CKW, rbox(0.075, 0.05, 0.04, 0.012), gloss, sd * 0.176, 0.012, 0.02);
        add(CKW, rbox(0.05, 0.018, 0.03, 6e-3), gR, sd * 0.176, 0.012, 0.04);
        add(CKW, rbox(0.052, 6e-3, 0.03, 3e-3, 3), gG, sd * 0.176, 0.042, 0.04);
        add(CKW, rbox(0.075, 0.03, 0.012, 6e-3), metal, sd * 0.172, 0.098, -0.07, 0, 0, -sd * 0.12);
        add(CKW, rbox(0.032, 7e-3, 8e-3, 3e-3, 3), gR, sd * 0.172, 0.12, -0.077, 0, 0, -sd * 0.12);
      });
      add(CKW, tube([[-0.17, -0.07, 0], [-0.08, -0.045, 0], [0, -0.04, 0], [0.08, -0.045, 0], [0.17, -0.07, 0]], 30, function() {
        return [7e-3, 0.012];
      }, [0, 0, 1], 8), carbon, 0, 0, -6e-3);
      G.updateMatrixWorld(true);
    }
    function drawDisp(v, gear, rp) {
      var x = dctx, w = 256, h = 160;
      x.fillStyle = "#010503";
      x.fillRect(0, 0, w, h);
      var g = x.createRadialGradient(128, 84, 10, 128, 84, 110);
      g.addColorStop(0, "rgba(40,120,30,.55)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
      for (var i2 = 0; i2 < 5; i2++) {
        x.strokeStyle = "rgba(120,255,70," + (0.95 - i2 * 0.17) + ")";
        x.lineWidth = 2.5;
        x.beginPath();
        x.arc(128, 84, 34 + i2 * 10, Math.PI * 0.76, Math.PI * 2.24);
        x.stroke();
      }
      x.strokeStyle = "#ff2b3a";
      x.lineWidth = 5;
      x.beginPath();
      x.arc(128, 84, 30, Math.PI * 0.76, Math.PI * (0.76 + 1.48 * rp));
      x.stroke();
      x.fillStyle = "#d4132a";
      x.beginPath();
      x.moveTo(104, 60);
      x.lineTo(128, 108);
      x.lineTo(152, 60);
      x.lineTo(141, 60);
      x.lineTo(128, 86);
      x.lineTo(115, 60);
      x.closePath();
      x.fill();
      x.strokeStyle = "rgba(255,255,255,.8)";
      x.lineWidth = 1.5;
      x.stroke();
      x.fillStyle = "#c8ff9a";
      x.font = "bold 10px sans-serif";
      x.textAlign = "center";
      x.fillText("VESPER GT-1", 128, 126);
      x.strokeStyle = "#8dff5a";
      x.lineWidth = 1.4;
      x.strokeRect(112, 132, 32, 18);
      x.beginPath();
      x.moveTo(120, 150);
      x.lineTo(120, 155);
      x.moveTo(136, 150);
      x.lineTo(136, 155);
      x.stroke();
      x.fillStyle = "#ffffff";
      x.font = "bold 11px sans-serif";
      x.fillText(gear, 128, 145);
      x.fillStyle = "#9dff6a";
      x.font = "9px sans-serif";
      x.textAlign = "left";
      x.fillText("ROAD", 14, 18);
      x.textAlign = "right";
      x.fillText(Math.round(v * 3.6) + " KM/H", 242, 18);
      DT.needsUpdate = true;
    }
    (function() {
      var sv = document.getElementById("rpm"), NS = "http://www.w3.org/2000/svg", cx = 300, cy = 340, R1 = 300;
      function mk(n, at) {
        var e = document.createElementNS(NS, n);
        for (var k in at) e.setAttribute(k, at[k]);
        sv.appendChild(e);
        return e;
      }
      for (var i2 = 0; i2 <= 40; i2++) {
        var a = (-46 + i2 * (92 / 40)) * Math.PI / 180, mj = i2 % 4 == 0, r0 = mj ? R1 - 22 : R1 - 12, l = mk("line", { x1: cx + Math.sin(a) * R1, y1: cy - Math.cos(a) * R1, x2: cx + Math.sin(a) * r0, y2: cy - Math.cos(a) * r0, "stroke-width": mj ? 4 : 2 });
        l.__r = i2 >= 32;
        TK.push(l);
        if (mj) mk("text", { x: cx + Math.sin(a) * (R1 - 46), y: cy - Math.cos(a) * (R1 - 46) + 6, "text-anchor": "middle", fill: "#d8d8d8", "font-size": 20 }).textContent = i2 / 4;
      }
    })();
    var GT = [0, 60, 110, 160, 210, 260, 330];
    function fmt(t) {
      if (t == null) return "--:--.--";
      var m = Math.floor(t / 60), s2 = t - m * 60;
      return (m < 10 ? "0" : "") + m + ":" + (s2 < 10 ? "0" : "") + s2.toFixed(2);
    }
    function hud(v, f) {
      var runD = DRV.d - DRV.d0;
      if (runD < L.lastD - 5) {
        L.t = 0;
        L.start = 0;
        L.last = null;
        L.best = null;
        L.lap = 1;
      }
      L.lastD = runD;
      L.t += f || 0;
      var lp = Math.floor(runD / 800) + 1;
      if (lp > L.lap) {
        L.last = L.t - L.start;
        L.start = L.t;
        L.best = L.best == null ? L.last : Math.min(L.best, L.last);
        L.lap = lp;
      }
      var kmh = Math.abs(v) * 3.6, g = 1;
      for (var i2 = 1; i2 < GT.length - 1; i2++) if (kmh >= GT[i2]) g = i2 + 1;
      var rp = kmh < 2 ? 0.12 : 0.3 + 0.68 * Math.min(1, (kmh - GT[g - 1]) / (GT[g] - GT[g - 1])), lab = v < -0.5 ? "R" : kmh < 2 ? "N" : "" + g;
      if (!hs.g) {
        ["gear", "cspd", "cmph", "clap", "clast", "cbestl"].forEach(function(n) {
          hs[n] = document.getElementById(n);
        });
      }
      hs.gear.textContent = lab;
      hs.cspd.textContent = Math.round(kmh);
      hs.cmph.textContent = Math.round(kmh * 0.621) + " mph";
      hs.clap.textContent = (L.lap < 10 ? "0" : "") + L.lap;
      hs.clast.textContent = fmt(L.last);
      hs.cbestl.textContent = fmt(L.best);
      TK.forEach(function(l, i3) {
        var on = i3 / 40 <= rp;
        l.setAttribute("stroke", on ? l.__r ? "#ff2b3a" : "#ffe9a8" : l.__r ? "#5a1018" : "#4a4a4a");
      });
      var nw = performance.now();
      if (DT && nw - lastDraw > 90) {
        lastDraw = nw;
        drawDisp(v, lab, rp);
      }
    }
    DRV.ckSync = function(v, off, f) {
      var on = DRV.on && DRV.cam === 1 && !off;
      if (DRV.on) hud(v, f);
      if (on && !built) build();
      if (G) G.visible = on;
      if (DRV.it === void 0) DRV.it = car.getObjectByName("Interior") || null;
      if (DRV.it) DRV.it.visible = !on;
      document.body.classList.toggle("cockpit", on);
      if (on && CKW) CKW.rotation.z = -DRV.steer * 0.8;
    };
  })();
  DRV.step = function(f) {
    var k = DRV.dead ? {} : DRV.k, up = k.w || k.arrowup, dn = k.s || k.arrowdown, L = k.a || k.arrowleft, Rt = k.d || k.arrowright, hb = k[" "], v = DRV.v, acc = 0;
    if (DRV.dead) {
      DRV.deadT += f;
      v *= Math.exp(-f * 2.5);
      if (DRV.deadT > 3) DRV.restart();
    }
    if (up) acc += 18 * (1 - Math.max(0, v) / 84);
    if (dn) acc -= v > 0.5 ? 36 : 15;
    if (hb) acc -= v > 0.5 ? 28 : 0;
    if (!up && !dn && !hb) {
      var dr = 1.4 + Math.abs(v) * 0.014;
      if (v > 0) v = Math.max(0, v - dr * f);
      else if (v < 0) v = Math.min(0, v + dr * f);
    }
    v += acc * f;
    v = Math.max(-9, Math.min(88, v));
    DRV.acc += (acc - DRV.acc) * (1 - Math.exp(-f * 6));
    for (var i2 = 0; i2 < 14; i2++) BEND.value[i2] = curv(DRV.d - DRV.d0 + (i2 + 0.5) * 20);
    var c0 = curv(DRV.d - DRV.d0);
    var ts = (L ? 1 : 0) - (Rt ? 1 : 0);
    DRV.steer += (ts - DRV.steer) * (1 - Math.exp(-f * 7));
    var sf2 = Math.min(1, Math.abs(v) / 5) * (v < 0 ? -1 : 1) * (DRV.air ? 0.35 : 1), vx = DRV.steer * sf2 * (4.5 + Math.min(Math.abs(v), 60) * 0.1);
    DRV.dv += (-c0 * v * v * 0.9 - DRV.dv * 3) * f;
    DRV.x += (vx + DRV.dv) * f;
    if (DRV.x > 7.6) {
      DRV.x = 7.6;
      DRV.dv = Math.min(0, DRV.dv);
      v *= 1 - f * 0.8;
    } else if (DRV.x < -7.6) {
      DRV.x = -7.6;
      DRV.dv = Math.max(0, DRV.dv);
      v *= 1 - f * 0.8;
    }
    DRV.d += v * f;
    DRV.wh += v * f / wheelRadius;
    while (!DRV.dead && DRV.next < DRV.d + 260) {
      DRV.spawnAt(DRV.next);
      DRV.next += 70 + Math.random() * 50;
    }
    var gy = 0, onR = false;
    for (var j = DRV.obs.length - 1; j >= 0; j--) {
      var o = DRV.obs[j];
      if (o.fly) {
        o.x += o.vx * f;
        o.y += o.vy * f;
        o.vy -= 20 * f;
        o.s += o.vz * f;
        o.g.rotation.x += o.sx * f;
        o.g.rotation.z += o.sz * f;
        o.life -= f;
        var rl = o.s - DRV.d;
        o.g.position.set(o.x, Math.max(0, o.y), rl);
        if (o.life <= 0 || rl < -40 || rl > 380) {
          scene.remove(o.g);
          DRV.obs.splice(j, 1);
        }
        continue;
      }
      o.s += o.u * f;
      var rel = o.s - DRV.d;
      o.g.position.set(o.x, 0, rel);
      if (rel < -45 || rel > 380) {
        scene.remove(o.g);
        DRV.obs.splice(j, 1);
        continue;
      }
      if (o.t === "ramp") {
        if (rel <= 0 && rel + RP.L >= 0 && Math.abs(DRV.x - o.x) < RP.W / 2 + 0.25) {
          var hh = RP.H * -rel / RP.L;
          if (hh > gy) gy = hh;
          onR = true;
        }
        continue;
      }
      if (!DRV.dead && Math.abs(rel) < o.l / 2 + 2.2 && Math.abs(DRV.x - o.x) < o.w / 2 + 0.95 && DRV.y < o.h - 0.1) {
        DRV.hits++;
        DRV.hitT = 1;
        DRV.dead = true;
        DRV.deadT = 0;
        var sc_ = Math.round(DRV.score + (DRV.d - DRV.d0) * 0.1);
        DRV.best = Math.max(DRV.best, sc_);
        var dd = document.getElementById("dscore");
        if (dd) dd.textContent = "DIST " + ((DRV.d - DRV.d0) / 1e3).toFixed(2) + " KM  \xB7  SCORE " + sc_ + "  \xB7  BEST " + DRV.best;
        document.body.classList.add("dead");
        o.fly = true;
        o.y = 0;
        o.vx = (o.x >= DRV.x ? 1 : -1) * (5 + Math.random() * 4);
        o.vy = 7 + Math.random() * 4;
        o.vz = Math.max(0, DRV.v) * 0.7 + 5;
        o.sx = (Math.random() - 0.5) * 10;
        o.sz = (Math.random() - 0.5) * 10;
        o.life = 2.5;
        for (var q = 0; q < 10; q++) ab(DRV.x + (Math.random() - 0.5) * 1.6, 0.3, 1.5, -30);
      }
    }
    if (DRV.air) {
      DRV.vy -= 21 * f;
      DRV.y += DRV.vy * f;
      if (DRV.y <= gy && DRV.vy < 0) {
        var hv = -DRV.vy;
        DRV.y = gy;
        DRV.air = false;
        DRV.vy = 0;
        if (DRV.airT > 0.45) {
          toast("AIR " + DRV.airT.toFixed(1) + " s");
          DRV.score += Math.round(DRV.airT * 120);
        }
        if (hv > 6) {
          v *= 1 - Math.min(0.1, hv * 8e-3);
          for (var q = 0; q < 14; q++) ab(DRV.x + (Math.random() - 0.5) * 2.4, 0.12, -1.2 + Math.random() * 2.4, -v * 3);
        }
      } else DRV.airT += f;
    } else {
      if (DRV.wasR && !onR && v > 8) {
        DRV.air = true;
        DRV.vy = Math.min(9.2, v * (RP.H / RP.L) * 1.5 + 2);
        DRV.airT = 0;
        DRV.jumps++;
      } else DRV.y = gy;
    }
    DRV.wasR = onR;
    DRV.v = v;
    DRV.yaw += (DRV.steer * 0.2 * Math.min(1, Math.abs(v) / 12) * (v < 0 ? -1 : 1) - DRV.yaw) * (1 - Math.exp(-f * 8));
    DRV.roll += (-DRV.steer * 0.022 * Math.min(1, Math.abs(v) / 30) - DRV.roll) * (1 - Math.exp(-f * 6));
    var tp = DRV.air ? Math.max(-0.4, Math.min(0.4, Math.atan2(-DRV.vy, Math.max(v, 12)) * 0.9)) : onR ? -RP.H / RP.L : Math.max(-0.03, Math.min(0.03, -DRV.acc * 7e-4));
    DRV.pitch += (tp - DRV.pitch) * (1 - Math.exp(-f * (DRV.air ? 3 : 6)));
    world.position.z = -((DRV.d % 120 + 120) % 120);
    ia.offset.y = -(nt.d + DRV.d) / 6;
    oa.opacity = 0;
    DRV.jr = clamp((v - 20) / 50) * 0.9;
    state.doorK += (0 - state.doorK) * (1 - Math.exp(-f * 2.2));
    if ((hb || dn) && v > 12 && !DRV.air) {
      DRV.sm += f * 90;
      while (DRV.sm > 1) {
        DRV.sm -= 1;
        [-1, 1].forEach(function(p) {
          ab(DRV.x + p * 0.78 + (Math.random() - 0.5) * 0.2, 0.12, -1.35, -v * 5);
        });
      }
    }
    var kh = document.getElementById("kmh");
    if (kh) kh.textContent = Math.round(Math.abs(v) * 3.6);
    var st = document.getElementById("stat");
    if (st) st.textContent = "DIST " + ((DRV.d - DRV.d0) / 1e3).toFixed(2) + " KM  \xB7  JUMPS " + DRV.jumps + "  \xB7  HITS " + DRV.hits + "  \xB7  SCORE " + Math.round(DRV.score + (DRV.d - DRV.d0) * 0.1);
    if (DRV.sw === null) {
      var rim = car.getObjectByName("Steering_Rim");
      if (rim) {
        car.updateMatrixWorld(true);
        var gp = new Group();
        gp.position.set(0.36, 0.735, 0.3);
        rim.parent.add(gp);
        ["Steering_Rim", "Steering_Hub", "Steering_Spoke_0", "Steering_Spoke_1", "Steering_Spoke_2"].forEach(function(n) {
          var o2 = car.getObjectByName(n);
          o2 && gp.attach(o2);
        });
        DRV.sw = gp;
      } else DRV.sw = 0;
    }
    if (DRV.sw) DRV.sw.rotation.z = -DRV.steer * 1.3;
    DRV.ckSync(v, false, f);
    var ho = document.getElementById("hit");
    if (ho) {
      ho.style.opacity = DRV.hitT.toFixed(3);
      DRV.hitT *= Math.exp(-f * 3);
    }
    DRV.cx += (DRV.x * 0.92 - DRV.cx) * (1 - Math.exp(-f * 4.5));
    DRV.fov += (52 + Math.min(16, Math.max(0, v) * 0.19) - DRV.fov) * (1 - Math.exp(-f * 3));
    var back = 6.6 + Math.max(0, v) * 0.035, h = 1.9 + Math.max(0, v) * 4e-3 + DRV.y * 0.5, la_ = bendJS(24);
    if (DRV.cam === 1) {
      var e = rotE(0, 0.9, -0.3), t = rotE(0, 0.55, 10), px = DRV.x + e[0], py = DRV.y + e[1], pz = e[2];
      return { p: [px, py, pz], tg: [DRV.x + t[0] + la_ * 0.5, DRV.y + t[1], t[2]], f: 84 + Math.min(10, Math.max(0, v) * 0.1) };
    }
    return { p: [DRV.cx + la_ * 0.12, h, -back], tg: [DRV.x * 0.7 - DRV.yaw * 5 + la_ * 0.7, 0.85 + DRV.y * 0.5, 5 + Math.max(0, v) * 0.12], f: DRV.fov };
  };
  addEventListener("keydown", function(e) {
    if (!DRV.on) return;
    var key = e.key.toLowerCase();
    if (key === "escape") {
      DRV.exit();
      return;
    }
    if (key === "c") {
      DRV.cam ^= 1;
      return;
    }
    if (key === "l") {
      DRV.toggleLights();
      return;
    }
    if ((key === "enter" || key === "r") && DRV.dead) {
      DRV.restart();
      return;
    }
    if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].indexOf(key) >= 0) e.preventDefault();
    DRV.k[key] = 1;
  });
  addEventListener("keyup", function(e) {
    var key = e.key.toLowerCase();
    delete DRV.k[key];
  });
  addEventListener("blur", function() {
    DRV.k = {};
  });
  var Ao = 0, mb = false, ko = null, va = 0, Jr = 0, jf = 0, aa = 0;
  function Pa(n, e, t) {
    let f = e ?? Math.min(0.05, (n - Ao) / 1e3 || 0.016);
    Ao = n, state.time += f, tkUpd(state.time), gs.x += (ca.x - gs.x) * (1 - Math.exp(-f * 2.5)), gs.y += (ca.y - gs.y) * (1 - Math.exp(-f * 2.5));
    let r = scrollY / d9();
    DRV.on || (state.target = clamp(r, 0, ua - 1));
    let s = state.chap;
    if (state.chap += (state.target - state.chap) * (1 - Math.exp(-f * (In ? 100 : 7))), state.arrDone) {
      let z = (state.chap - s) * 16 + (Dn ? 0 : 6) * f;
      state.dist += z, state.speed += (z / Math.max(f, 1e-3) - state.speed) * (1 - Math.exp(-f * 6)), ia.offset.y = -(nt.d + state.dist) / 6, oa.opacity = 0.3 + Math.min(0.2, Math.abs(state.speed) * 0.012), ko = (nt.d + state.dist) / wheelRadius;
    }
    va = 0, Jr = 0, jf = 0, aa = 0, Ns.forEach((z) => z.material.opacity = 0);
    let v, a = 0, P = 0, i2 = null, u = Dn ? 0 : Math.sin(state.time * 0.35) * 1.6, o = null;
    if (state.arr >= 0 && !state.arrDone) {
      state.arr += f;
      let z = state.arr - o9;
      if (z < 0) {
        let c = nb(state.arr);
        o = c, Yr += c.v * f, i2 = Yr / wheelRadius, Jr = clamp(c.v / 32) * 0.95, jf = clamp(c.v / 60) * 0.02, ia.offset.y = -Yr / 6, world.position.z = -(Yr % 120), u9(99, false), scene.environmentIntensity = lerp(0.22, 1, c.lit), vf.intensity = lerp(0.2, 1.5, c.lit), i9.forEach((b) => b.intensity = 55 * c.lit), oa.opacity = c.i === 0 ? 0 : 0.5, state.doorK = c.door, aa = c.flash * 1.3, Ns.forEach((b, p) => {
          let d = c.i === 4 && Math.sin(state.arr * (41 + p * 11) + p * 2) > 0.5;
          b.material.opacity = d ? 0.95 : 0, b.scale.setScalar(d ? 0.22 + Math.random() * 0.22 : 0.01);
        }), u = 0;
      } else {
        let c = rb(z);
        if (world.position.z = 0, state.doorK = 0, v = c.pose, P = c.z, a = c.pitch, i2 = c.dist / wheelRadius, va = c.yaw, Jr = clamp(c.speed / 30), jf = clamp(c.speed / 45) * 0.03, ia.offset.y = -c.dist / 6, u9(z, false), c.u > 0.18 && c.u < 0.92) for (a9 += f * 110; a9 > 1; ) a9 -= 1, [-1, 1].forEach((p) => ab(p * 0.78 + (Math.random() - 0.5) * 0.2, 0.12, c.z - 1.35, c.speed));
        Ns.forEach((p, d) => {
          let l = c.u > 0.12 && c.u < 0.85 && Math.sin(z * (47 + d * 9) + d) > 0.45;
          p.material.opacity = l ? 0.95 : 0, p.scale.setScalar(l ? 0.25 + Math.random() * 0.25 : 0.01);
        }), aa = Math.max(0, 1 - (z - nt.T) / 0.35) * (z >= nt.T ? 1 : 0) + Math.max(0, 1 - z / 0.2), z > nt.T + 0.3 && !state.titleShown && (state.titleShown = true, document.body.classList.add("ready")), z >= nt.total && Gr(), u = 0;
      }
    } else (state.arr >= 0 || state.arrDone) && (DRV.on ? (o = DRV.step(f), i2 = DRV.wh, a = DRV.pitch, va = DRV.yaw, Jr = DRV.jr, jf = 0, Yo = false) : (v = fb(state.chap), world.position.z = -((state.dist % 120 + 120) % 120), state.doorK += (state.doorT - state.doorK) * (1 - Math.exp(-f * 2.2)), Yo = false, i2 = ko, a = clamp(-state.speed * 6e-4, -0.01, 0.01), Jr = clamp((Math.abs(state.speed) - 4) / 26) * 0.8, jf = clamp(Math.abs(state.speed) / 60) * 0.012));
    if (o) {
      if (camera.position.set(o.p[0], o.p[1], o.p[2]), false) {
        let z = state.time * 41;
        camera.position.x += Math.sin(z) * jf, camera.position.y += Math.sin(z * 1.4 + 2) * jf * 0.8;
      }
      camera.lookAt(o.tg[0], o.tg[1], o.tg[2]), camera.fov = o.f, camera.clearViewOffset(), camera.updateProjectionMatrix();
    }
    if (v) {
      if (tb(v, state.arrDone ? u : 0, gs), false) {
        let b = state.time * 38;
        camera.position.x += Math.sin(b) * jf, camera.position.y += Math.sin(b * 1.3 + 2) * jf * 0.7;
      }
      state.arrDone && (camera.fov += Math.min(9, Math.abs(state.speed) * 0.22), 0);
      let z = innerWidth, c = innerHeight;
      z <= 820 ? camera.setViewOffset(z, c, 0, c * 0.13, z, c) : camera.setViewOffset(z, c, (v.ox || 0) * z, 0, z, c), camera.updateProjectionMatrix();
    }
    if (car.position.set(DRV.x, DRV.y, P), car.rotation.set(a, va, DRV.roll), carMirror.position.set(DRV.x, -DRV.y, P), carMirror.rotation.set(-a, va, -DRV.roll), i2 !== null && (Vs.forEach((z) => z.rotation.x = i2), Bo.forEach((z) => z.rotation.x = i2)), i9.forEach((z) => z.updateMatrixWorld()), vf.position.set(-4.5 + DRV.x, 8, P + 5.5), vf.target.position.set(DRV.x, 0, P), la.position.set(DRV.x, 3e-3, P), la.scale.setScalar(1 / (1 + DRV.y * 0.35)), scene.environmentRotation.y = state.chap * 0.5 + Ro + state.time * (Dn ? 0 : 0.01), state.arrDone ? pb(state.chap) : Ws.forEach((z) => {
      z.dataset.i !== "0" && (z.style.visibility = "hidden", z.style.opacity = 0);
    }), !state.arrDone && state.titleShown) {
      let z = Ws[0], c = easeOutCubic(clamp((state.arr - o9 - nt.T - 0.3) / 0.7));
      z.style.visibility = "visible", z.style.opacity = c, z.style.transform = `translate3d(${((1 - c) * -60).toFixed(1)}px,0,0)`, $("h1", z).style.letterSpacing = (0.04 + (1 - c) * 0.25).toFixed(3) + "em";
    }
    eb(), Go(), Pb(f), state.arrDone && LIT.apply(), state.arrDone && Ns.forEach((z) => z.material.opacity = 0), (!t || Jr > 0) && ub(Dn ? 0 : Jr), $("#flash").style.opacity = (aa * 0).toFixed(3), t || composer.render(f);
  }
  function f3(n) {
    state.arr = 0, state.arrDone = false, state.titleShown = false, Yr = 0, state.doorK = 0, document.body.classList.remove("ready"), document.body.classList.add("locked"), $("#skip").style.display = "block", Ws.forEach((e) => {
      e.style.opacity = 0;
    }), Dn && Gr();
  }
  function Gr() {
    state.arrDone = true, state.arr = o9 + nt.total, state.titleShown = true, state.doorK = 0, Ns.forEach((n) => n.material.opacity = 0), car.position.z = 0, car.rotation.x = 0, car.rotation.y = 0, u9(0, true), za.forEach((n) => n.life = 0), $("h1", Ws[0]).style.letterSpacing = "", document.body.classList.remove("locked"), document.body.classList.add("ready"), $("#skip").style.display = "none";
  }
  $("#skip").onclick = Gr;
  $d().then(() => {
    mb = true, $("#load").classList.add("gone"), window.__vesper = { drive: DRV, step(n = 0.016) {
      Pa(performance.now(), n);
    }, arrive(n) {
      state.arr = 0, state.arrDone = false, state.titleShown = false, Yr = 0, state.doorK = 0;
      let e = 0;
      for (; e < n - 1e-6; ) {
        let t = Math.min(0.25, n - e);
        e += t, Pa(0, t, e < n - 1e-6);
      }
    }, chapter(n) {
      Gr();
      let e = d9();
      scrollTo(0, n * e), state.chap = state.target = n, Pa(0, 0.016);
    }, state, livery: db, finish: Gr, info: () => ({ wheelR: wheelRadius, wheels: Vs.length, paints: qs.length, emissives: l9.map((n) => n.name) }) }, $("#drive").onclick = function() {
      DRV.enter();
    }, $("#exitd").onclick = function() {
      DRV.exit();
    }, $("#viewb").onclick = function() {
      DRV.cam ^= 1;
    }, $("#litb").onclick = function() {
      DRV.toggleLights();
    }, $("#retry").onclick = function() {
      DRV.restart();
    }, [["#tl", "a"], ["#tr", "d"], ["#tb", "s"], ["#tg", "w"]].forEach(function(p) {
      var el = $(p[0]);
      el.addEventListener("pointerdown", function(e) {
        e.preventDefault();
        DRV.k[p[1]] = 1;
      });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function(t) {
        el.addEventListener(t, function() {
          delete DRV.k[p[1]];
        });
      });
    }), So.has("noarrive") ? Gr() : f3(), In || requestAnimationFrame(function n(e) {
      Pa(e), requestAnimationFrame(n);
    }), document.documentElement.dataset.ready = "1";
  }).catch((n) => {
    console.error(n), document.body.classList.add("nowebgl", "ready"), $("#load").classList.add("gone");
  });
}
export {
  startVesper
};
