import { 
    createList, 
    getListsByUserId, 
    getSingleListById, 
    updateListById, 
    deleteListById 
} from "../services/listServices.js";

export const createListController = async (req, res) => {
    const { title } = req.body;
    const userId = req.user.userId;

    try {
        const result = await createList({ title, userId });
        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getListsByUserIdController = async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await getListsByUserId(userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const getSingleListByIdController = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const result = await getSingleListById(id, userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const updateListByIdController = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const userId = req.user.userId;

    try {
        const result = await updateListById(id, userId, title);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const deleteListByIdController = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    try {
        const result = await deleteListById(id, userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
