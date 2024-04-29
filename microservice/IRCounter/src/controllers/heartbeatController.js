const Heartbeat = require('../database/models/Heartbeat');
const Store = require("../database/models/Store")

// Crear un nuevo Heartbeat
exports.create = async (req, res) => {
    const { sn, timeStamp, receivingPower, transmissionPower, codeStatus, version, model } = req.body;

    try {
        // Buscar en la base de datos Store un registro con el mismo 'sn'
        const store = await Store.findOne({ sn: sn });

        // Crear un nuevo Heartbeat con 'idStore' vacío o con el 'idStore' encontrado
        const newHeartbeat = new Heartbeat({
            sn,
            timeStamp,
            receivingPower,
            transmissionPower,
            codeStatus,
            version,
            model,
            idStore: store ? store.idStore : ''  // Asignar 'idStore' si se encontró el 'sn' en Store, si no, dejarlo vacío
        });

        // Guardar el nuevo Heartbeat en la base de datos
        const savedHeartbeat = await newHeartbeat.save();
        res.status(201).json(savedHeartbeat);
    } catch (error) {
        res.status(400).json({ message: "Error creating Heartbeat: " + error.message });
    }
};

// Listar todos los Heartbeats
exports.listAll = async (req, res) => {
    try {
        const heartbeats = await Heartbeat.find();
        res.json(heartbeats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar un Heartbeat por ID
exports.search = async (req, res) => {
    try {
        const query = {};
        const { sn, timeStamp, receivingPower, transmissionPower, codeStatus, version, model, idStore } = req.query;

        if (sn) query.sn = sn;
        if (timeStamp) query.timeStamp = new Date(timeStamp);
        if (receivingPower) query.receivingPower = Number(receivingPower);
        if (transmissionPower) query.transmissionPower = Number(transmissionPower);
        if (codeStatus) query.codeStatus = codeStatus;
        if (version) query.version = version;
        if (model) query.model = model;
        if (idStore) query.idStore = idStore;

        const heartbeats = await Heartbeat.find(query);
        if (heartbeats.length > 0) {
            res.json(heartbeats);
        } else {
            res.status(404).json({ message: 'No heartbeats found matching the criteria.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Método para actualizar un Heartbeat por UUID
exports.update = async (req, res) => {
    const { uuid } = req.params;  // Recibe el UUID desde el parámetro de la URL

    try {
        const heartbeat = await Heartbeat.findOneAndUpdate({ uuid: uuid }, req.body, { new: true });
        if (!heartbeat) {
            res.status(404).json({ message: 'Heartbeat not found' });
        } else {
            res.json(heartbeat);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Eliminar un Heartbeat por ID

exports.delete = async (req, res) => {
    const { uuid } = req.params; // Usamos 'uuid' en lugar de 'id'
    try {
        const result = await Heartbeat.findOneAndDelete({ uuid: uuid });
        if (!result) {
            res.status(404).json({ message: "Heartbeat not found" });
        } else {
            res.json({ message: "Heartbeat deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Buscar el Heartbeat más reciente por SN
exports.searchLatestBySN = async (req, res) => {
    try {
        const { sn } = req.query;
        if (!sn) {
            return res.status(400).json({ message: "Serial number (SN) is required." });
        }

        // Buscar todos los registros que coincidan con el SN y ordenarlos por timeStamp en orden descendente
        const latestHeartbeat = await Heartbeat.findOne({ sn }).sort({ timeStamp: -1 });

        if (latestHeartbeat) {
            res.json(latestHeartbeat);
        } else {
            res.status(404).json({ message: 'No heartbeat found for the given SN.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
