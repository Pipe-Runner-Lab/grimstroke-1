import { initializeFoundation } from 'utils/base';
import Artwork from 'components/artwork';
import random from 'canvas-sketch-util/random';
import './index.css';

const SEED = 37;

random.setSeed(SEED);

const canvas = initializeFoundation();

const artwork = new Artwork(canvas);

// artwork.render(SEED);

function animate(timestamp = 0): void {
  artwork.render(SEED, timestamp);
  requestAnimationFrame(animate);
}

animate();
