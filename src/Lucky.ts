import {
  AssetManager,
  createGameLoop,
  createViewport,
  PolygonBatch,
  Texture,
} from "gdxts";
import { eventEmitter } from "./eventEmitter";

const TOTAL_NUMBERS = 10;
const MAX_SPEED = 7.1 * Math.PI;
const STOPPING_DISTANCE = 10 * (Math.PI * 2);
const EULER_CORRECTION = Math.PI / 16;

export const createGame = async (
  canvas: HTMLCanvasElement
): Promise<() => void> => {
  const viewport = createViewport(canvas, 700, 700);
  const gl = viewport.getContext();
  const camera = viewport.getCamera();
  camera.setYDown(true);

  const assetManager = new AssetManager(gl);
  assetManager.loadTexture("./assets/spinBg.png", "spin-bg");
  assetManager.loadTexture("./assets/spinBg2.png", "spin-bg2");
  assetManager.loadTexture("./assets/flag.png", "flag");
  await assetManager.finishLoading();

  const spinBg = assetManager.getTexture("spin-bg") as Texture;
  const spinBg2 = assetManager.getTexture("spin-bg2") as Texture;
  const flag = assetManager.getTexture("flag") as Texture;
  let currentResult = 3;
  let angle = 0;
  let spinning = false;
  let accelerator = 0;
  let speed = 0;

  const spinHandler = () => {
    spinning = true;
    speed = MAX_SPEED;
  };

  const spinToHandler = (itemIndex: number) => {
    console.log("will spin to", itemIndex +1);
    currentResult = itemIndex + 1;
    setTimeout(() => {
      const distance =
        getTargetAngle() + EULER_CORRECTION - angle + STOPPING_DISTANCE;
      const t = (distance * 2) / MAX_SPEED;
      accelerator = -MAX_SPEED / t;
    }, 2000);
  };
  eventEmitter.on("startSpin", spinHandler);
  eventEmitter.on("spinTo", spinToHandler);

  const getTargetAngle = (): number => {
    return (
      ((2 * Math.PI) / TOTAL_NUMBERS) * currentResult - Math.PI / TOTAL_NUMBERS
    );
  };

  const batch = new PolygonBatch(gl);
  batch.setYDown(true);
  batch.setProjection(camera.combined);

  gl.clearColor(0, 0, 0, 0);
  const loop = createGameLoop((delta) => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.begin();
    batch.draw(spinBg2, -10, -10, 720, 720, 360, 360);
    batch.draw(spinBg, 130, 130, 440, 440, 220, 220, -angle);
    batch.draw(flag, 350 - 38, 350 - 70, 76, 104.76);
    batch.end();

    if (spinning && speed <= 0) {
      spinning = false;
      speed = 0;
      accelerator = 0;
      eventEmitter.emit("spinDone");
    }

    speed += accelerator * delta;

    angle += speed * delta;
    angle %= Math.PI * 2;
  });

  const dispose = () => {
    loop.stop();
    assetManager.disposeAll();
    batch.dispose();
    eventEmitter.off("startSpin", spinHandler);
    eventEmitter.off("spinTo", spinToHandler);
  };
  return dispose;
};
