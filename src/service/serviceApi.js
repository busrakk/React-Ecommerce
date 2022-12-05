import { sendRequest } from "./rootApi";

//const GET = 'get';
const POST = 'post';

// export const registerApi = async (payload) => {
//     return sendRequest(payload);
// }

export const categoryInsertApi = async (payload=[]) => {
    return sendRequest(POST, '/api/admin/category-store', payload);
}

export const categoryListApi = async (payload=[]) => {
    return sendRequest(POST, '/api/admin/category-list', payload);
}

export const categoryDeleteApi = async (id, payload=[]) => {
    return sendRequest(POST, `/api/admin/category-delete/${id}`, payload);
}
