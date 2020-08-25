import { slideContants } from '../constants';
const initialState = {
    currentSlide: {},
    slides: [],
    slideColumns: [],
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
            const { loading, ...stateCopy } = state;

            return {
                ...stateCopy,
                slideColumns: action.slides
            };

        case slideContants.UPDATE_SUCCESS:
            return {
                ...state,
                currentSlide: action.slide
            };
    
        case slideContants.ERROR:
            return { 
                error: action.error
            };

        default:
            return state
    }
}