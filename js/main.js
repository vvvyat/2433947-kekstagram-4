import {getPhotoDescriptions} from './photo-descriptions.js';
import {creatMiniatures} from './draw-miniatures.js';
import {renderBigPicture} from './big-picture-modal.js';

const picturesData = getPhotoDescriptions();
creatMiniatures(picturesData);
renderBigPicture();

export {picturesData};
