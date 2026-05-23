import fs from 'fs';
import path from 'path';

const routes = [
  'about-us',
  'tour-packages',
  'destinations',
  'activity',
  'contact',
  'login',
  'dashboard',
  'privacy-policy',
  'terms-and-conditions',
  'itinerary-builder',
  'itinerary/result',
  'chardham-yatra-from-haridwar',
  'kedarnath-tour-package',
  'rishikesh-river-rafting',
  'haridwar-taxi-service',
  'auli-tour-package',
  'chopta-tour-package',
  'badrinath-tour-package',
  'dodham-yatra',
  'rishikesh-adventure-activities',
  'blog',
  'blog/best-time-for-kedarnath-yatra',
  'blog/chardham-packing-list',
  'blog/haridwar-to-kedarnath-distance',
  'tour/char-dham-yatra',
  'tour/do-dham-yatra',
  'tour/rishikesh-adventure-tour',
  'tour/nainital-lake-tour',
  'tour/mussoorie-hill-escape',
  'tour/jim-corbett-wildlife-safari',
  'tour/auli-snow-adventure',
  'tour/haridwar-spiritual-sojourn',
  'tour/kedarnath-yatra',
  'tour/chopta-tungnath-trek',
  'tour/harsil-valley-escape',
  'tour/binsar-wildlife-retreat',
  'tour/shimla-manali-tour',
  'tour/dharamshala-dalhousie-tour',
  'tour/spiti-valley-adventure',
  'tour/kasol-kheerganga-trek',
  'tour/romantic-himachal-honeymoon',
];

const distDir = path.resolve('dist');
const srcHtml = path.join(distDir, 'index.html');

if (!fs.existsSync(srcHtml)) {
  console.error('Source index.html does not exist in dist.');
  process.exit(1);
}

routes.forEach(route => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(srcHtml, path.join(targetDir, 'index.html'));
  console.log(`Copied index.html to ${targetDir}`);
});

console.log('Prerendering setup completed.');
