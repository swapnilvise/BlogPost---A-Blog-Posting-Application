export const initialState = {
    page: 'login'
}

export function reducer(state, action) {
    switch (action.type) {
        case '':
            return { page: 'login'};
        case 'login':
            return { page: action.type };
        case 'register':
            return { page: action.type };
        case 'home':
            return { page: action.type };
        case 'settings':
            return { page: action.type };
        case 'single':
            console.log('in single reducer');
            return { page: action.type };
        case 'write':
            return { page: action.type };
        default:
            return { ...state };
    }
}