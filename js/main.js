import {getPhotoDescriptions} from './photo-descriptions.js';
import {creatMiniatures} from './draw-miniatures.js';

const picturesData = getPhotoDescriptions();
creatMiniatures(picturesData);
