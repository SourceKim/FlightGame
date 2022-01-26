import '../Styles/Views.scss'

enum FGCOLOR {
    DEFAULT = '#000000',
    RED = 'rgba(219, 55, 127)',
    YELLOW = '#ffd400',
    MASSTONE = '#798f9a',
    ROSEATE = '#f05b72',
    LIGHT_GREEN = 'rgba(117, 186, 28)',
    BLUE = 'rgba(101, 183, 236)',
    ORANGE = 'rgba(228, 120, 21)',
    BLACK = '#000000',
    RICE = 'rgba(255, 255, 190)',
}

interface FGFrame {
    x: number, 
    y: number,
    w: number,
    h: number,
}
interface FGPosition {x: number, y: number}
interface FGSize {width: number, height: number}
interface FGViewScale {x: number, y: number, z: number}

enum FGStepType {
    STEP_TYPE_ERROR = -1,
    RIGHT_DOWN = 0,
    LEFT_DOWN = 1,
    LEFT_TOP = 2,
    RIGHT_TOP = 3,
    VERTICAL = 4,
    HORIZON = 5,
    MIDSTEP = 6
}

let FGSceneFrame: FGFrame = {x: 5, y: 0, w: 17, h: 17}

export {FGCOLOR, FGFrame, FGStepType, FGSize, FGViewScale, FGPosition, FGSceneFrame}