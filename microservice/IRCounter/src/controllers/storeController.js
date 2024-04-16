const Store = require('../database/models/Store');

exports.create = async (req, res) => {
    const { idStore, name, sn } = req.body;
    try {
        const newStore = new Store({
            idStore,
            name,
            sn
        });
        await newStore.save();
        res.status(201).json(newStore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Método para listar todos los stores
exports.listAll = async (req, res) => {
    try {
        const stores = await Store.find();
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Método para buscar stores por campos específicos
exports.search = async (req, res) => {
    try {
        const query = {};
        const { idStore, name, sn, uuid } = req.query;

        if (idStore) query.idStore = idStore;
        if (name) query.name = name;
        if (sn) query.sn = sn;
        if (uuid) query.uuid = uuid;

        const stores = await Store.find(query);
        if (stores.length > 0) {
            res.json(stores);
        } else {
            res.status(404).json({ message: 'No stores found matching the criteria.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Método para actualizar un store por UUID
exports.update = async (req, res) => {
    const { uuid } = req.params; // Usamos 'uuid' en lugar de 'id'
    try {
        const store = await Store.findOneAndUpdate({ uuid: uuid }, req.body, { new: true });
        if (!store) {
            res.status(404).json({ message: 'Store not found' });
        } else {
            res.json(store);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Método para eliminar un store por UUID
exports.delete = async (req, res) => {
    const { uuid } = req.params; // Usamos 'uuid' en lugar de 'id'
    try {
        const result = await Store.findOneAndDelete({ uuid: uuid });
        if (!result) {
            res.status(404).json({ message: 'Store not found' });
        } else {
            res.json({ message: 'Store deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};