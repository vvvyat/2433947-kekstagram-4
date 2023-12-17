import {getPhotoDescriptions} from './photo-descriptions.js';
import {creatMiniatures} from './draw-miniatures.js';
import {renderBigPicture} from './big-picture-modal.js';
import './upload-form.js';

const picturesData = getPhotoDescriptions();
creatMiniatures(picturesData);
renderBigPicture();

export {picturesData};
