import { memo, useEffect } from "react";
import { startVesper } from "./engine/vesper.js";

// The 3D engine drives these elements imperatively (ids are its contract), so
// the markup is rendered once and never re-rendered.
const Markup = memo(function Markup() {
  return (
    <>
      <canvas id="stage" aria-label="Interactive 3D model of the Vesper GT-1 coupé"></canvas>
      <div id="veil"></div>
      <canvas id="fx" aria-hidden="true"></canvas>
      <div id="flash" aria-hidden="true"></div>
      <div className="bar top" aria-hidden="true"></div><div className="bar bot" aria-hidden="true"></div>
      <div id="nogl"></div>

      <div id="load" role="status"><div className="w">VESPER</div><div className="p"><i id="lbar"></i></div><div className="n" id="lnum">LOADING 0%</div></div>

      <header id="bar" className="ui">
        <a className="mark" href="#" id="home" aria-label="Vesper GT-1, back to top">
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M2 3h8l6 15 6-15h8L19 29h-6z" fill="#e0152b"/><path d="M13 29 6 11" stroke="#060607" strokeWidth="1.6" fill="none"/></svg>
          Vesper <small>GT-1</small>
        </a>
        <div className="grp"><button className="chip solid" id="drive" type="button">Drive</button><button className="chip" id="replay" type="button">Replay arrival</button></div>
      </header>

      <nav className="rail ui" id="rail" aria-label="Chapters"></nav>
      <div className="ui" id="hint"><span>Scroll</span><b></b></div>
      <button className="chip ui" id="skip" type="button">Skip intro</button>

      {/* 0 hero */}
      <section className="pn low" data-i="0" aria-label="Introduction">
        <p className="eyebrow">Concept coupé <em>/ mid-engine / rear drive</em></p>
        <h1><span>Vesper</span><span className="o">GT-1</span></h1>
        <div className="hero-sub">Cut by air. Made for the track.</div>
      </section>
      {/* 1 silhouette */}
      <section className="pn" data-i="1" aria-label="Silhouette">
        <p className="eyebrow">Silhouette</p>
        <h2>One line from nose to tail</h2>
        <p>The cabin sits far forward and low. A shoulder line runs the full length of the body, and every surface is drawn from a single smooth loft, so <strong>the reflections never break</strong>. Pick any colour in the Configure chapter.</p>
        <dl className="facts"><div><dt>Length</dt><dd>4.57 m</dd></div><div><dt>Height</dt><dd>1.14 m</dd></div></dl>
      </section>
      {/* 2 aero */}
      <section className="pn right" data-i="2" aria-label="Aerodynamics">
        <p className="eyebrow">Aerodynamics <em>/ Track edition</em></p>
        <h2>A wing with two elements</h2>
        <p>A main plane and a steep flap hang from swan-neck struts that lift the load into clean air. Both are finished in <strong>gloss 2×2 twill carbon</strong> with red Gurney edges and compact endplates.</p>
        <p className="note">The wing is fitted on the <strong>Track</strong> edition (Configure &rarr; Edition) and takes your body colour.</p>
        <dl className="facts"><div><dt>Span</dt><dd>1.67 m</dd></div><div><dt>Weave</dt><dd>2×2 twill</dd></div></dl>
      </section>
      {/* 3 wheels */}
      <section className="pn" data-i="3" aria-label="Wheels and brakes">
        <p className="eyebrow">Wheels &amp; brakes</p>
        <h2>Ten spokes, five pairs</h2>
        <p>Twin-spoke alloys frame <strong>drilled discs and red calipers</strong>. The tyre carries real tread grooves, and the wheels turn when the car moves.</p>
      </section>
      {/* 4 cockpit */}
      <section className="pn right" data-i="4" aria-label="Cockpit">
        <p className="eyebrow">Cockpit</p>
        <h2>Built around the driver</h2>
        <p>Low seating, a flat-bottom wheel and red leather against black trim. The cabin sits ahead of the engine, close to the front axle.</p>
      </section>
      {/* 5 numbers */}
      <section className="pn" data-i="5" aria-label="Numbers">
        <p className="eyebrow">Numbers</p>
        <h2>Proportions first</h2>
        <div className="stats">
          <div><b data-count="4.57" data-dec="2">0<u>m</u></b><span>Length</span></div>
          <div><b data-count="1.95" data-dec="2">0<u>m</u></b><span>Width</span></div>
          <div><b data-count="1.14" data-dec="2">0<u>m</u></b><span>Height</span></div>
          <div><b data-count="2.70" data-dec="2">0<u>m</u></b><span>Wheelbase</span></div>
        </div>
        <p className="note">Dimensions are measured from the 3D model. Vesper GT-1 is a design concept and has no performance figures.</p>
      </section>
      {/* 6 configure */}
      <section className="pn right" data-i="6" aria-label="Configure">
        <p className="eyebrow">Configure</p>
        <h2>Build your Vesper</h2>
        <div className="fin tabs" id="tabs" role="group" aria-label="Options"><button type="button" data-v="body" aria-pressed="true">Body</button><button type="button" data-v="wheels" aria-pressed="false">Wheels</button><button type="button" data-v="edition" aria-pressed="false">Edition</button></div>
        <div className="tp" data-tab="body">
          <div className="lab">Upper body</div><div className="sw" id="swU" role="group" aria-label="Upper body colour"></div>
          <div className="lab">Lower body</div><div className="sw" id="swL" role="group" aria-label="Lower body colour"></div>
          <div className="lname" id="lname" aria-live="polite"></div>
          <div className="fin" id="fin" role="group" aria-label="Finish"><button type="button" data-v="gloss" aria-pressed="true">Gloss</button><button type="button" data-v="satin" aria-pressed="false">Satin</button></div>
        </div>
        <div className="tp" data-tab="wheels" hidden>
          <div className="lab">Wheel finish</div><div className="sw" id="swW" role="group" aria-label="Wheel finish"></div>
          <div className="lab">Brake calipers</div><div className="sw" id="swC" role="group" aria-label="Caliper colour"></div>
          <div className="lab">Tyre sidewall</div><div className="sw" id="swT" role="group" aria-label="Tyre sidewall"></div>
          <div className="lname" id="wname" aria-live="polite"></div>
        </div>
        <div className="tp" data-tab="edition" hidden>
          <div className="fin" id="edition" role="group" aria-label="Edition"><button type="button" data-v="road" aria-pressed="true">Road</button><button type="button" data-v="track" aria-pressed="false">Track</button></div>
          <p id="edinfo" className="note">Clean rear deck without the wing. Same body, quieter look.</p>
          <div className="lab">Doors</div>
          <div className="fin" id="doors" role="group" aria-label="Doors"><button type="button" data-v="closed" aria-pressed="true">Closed</button><button type="button" data-v="open" aria-pressed="false">Open</button></div>
          <div className="lab">Lights</div>
          <div className="fin" id="lights" role="group" aria-label="Lights"><button type="button" data-v="on" aria-pressed="true">On</button><button type="button" data-v="off" aria-pressed="false">Off</button></div>
        </div>
      </section>
      {/* 7 end */}
      <section className="pn low" data-i="7" aria-label="End">
        <p className="eyebrow">Vesper GT-1</p>
        <h2>Drive it in again</h2>
        <p>Move through the car once more, or watch it arrive from the beginning.</p>
        <div className="cta"><button className="chip solid" id="again" type="button">Replay arrival</button><button className="chip" id="top" type="button">Back to start</button></div>
      </section>

      <div className="ui" id="hud"><div className="spd"><b id="kmh">0</b><span>km/h</span></div><p>W / &uarr; gas &middot; S / &darr; brake &middot; A D / &larr; &rarr; steer &middot; Space handbrake &middot; C view &middot; L lights &middot; Esc exit</p><div className="hb"><button className="chip" id="viewb" type="button">View</button><button className="chip" id="litb" type="button">Lights</button><button className="chip" id="exitd" type="button">Exit</button></div></div>
      <div className="ui" id="touch"><div><button id="tl" type="button">&#9664;</button><button id="tr" type="button">&#9654;</button></div><div><button id="tb" type="button">Brake</button><button id="tg" type="button">Gas</button></div></div>
      <div id="cpit"><svg id="rpm" viewBox="0 0 600 150" aria-hidden="true"></svg><div className="crow"><div className="cl"><div><i>Last lap</i><b id="clast">--:--.--</b></div><div><i>Best lap</i><b id="cbestl">--:--.--</b></div><div><i>Lap</i><b id="clap">01</b></div></div><div className="gear" id="gear">N</div><div className="cs"><b id="cspd">0</b><span>km/h</span><em id="cmph">0 mph</em></div></div></div>
      <div id="hit"></div><div id="died"><h2>You died</h2><p id="dscore"></p><button className="chip solid" id="retry" type="button">Retry</button><small>Enter / R to restart</small></div><div id="toast"></div><div className="ui" id="stat"></div>
      <div id="spacer"></div>
    </>
  );
});

let started = false;

export default function App() {
  useEffect(() => {
    if (started) return; // guard against double effects in dev
    started = true;
    startVesper({ modelUrl: `${import.meta.env.BASE_URL}models/vesper.glb` });
  }, []);
  return <Markup />;
}
