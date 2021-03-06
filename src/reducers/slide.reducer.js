import { slideContants } from '../constants';
const initialState = {
    currentSlide: {},
    slides: [],
    slideColumns: [],
    slideHandlerProps: {},
}

export function slide(state = initialState, action) {
    switch (action.type) {
        case slideContants.REQUEST:
            return {
                ...state,
                loading: true
            };

        case slideContants.CREATE_SUCCESS:
            return {
                ...state,
                currentSlide: action.slide
            };

        case slideContants.GETALL_SLIDE_SUCCESS:
            return {
                ...state,
                slides: action.slides
            };

        case slideContants.GET_SLIDE_SUCCESS:
            return {
                ...state,
                currentSlide: action.slide
            };

        case slideContants.GET_SLIDE_COLUMNS_SUCCESS:
            return {
                ...state,
                slideColumns: action.slides
            };

        case slideContants.UPDATE_SUCCESS:
            return {
                ...state,
                message: action.slide
            };
    
        case slideContants.DELETE:
            return {
                ...state,
                message: action.slide
            };

        case slideContants.ADD_SLIDE_PROPS:
            return {
                ...state,
                slideHandlerProps: action.addSlideProps
            };
            
        case slideContants.EDIT_SLIDE_PROPS:
            return {
                ...state,
                slideHandlerProps: action.editSlideProps
            };
    
        case slideContants.ERROR:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }
}