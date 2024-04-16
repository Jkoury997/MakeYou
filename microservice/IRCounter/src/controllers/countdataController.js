const CountData = require('../database/models/CountData');
const Store = require("../database/models/Store")

// Método para crear un nuevo CountData
exports.create = async (req, res) => {
    const { sn, timeStamp, inCount, outCount, receivingPower, transmissionPower, codeStatus, version, model } = req.body;

    try {
        // Buscar en la base de datos Store un registro con el mismo 'sn'
        const store = await Store.findOne({ sn: sn });

        // Crear un nuevo CountData con 'idStore' vacío o con el 'idStore' encontrado
        const newCountData = new CountData({
            sn,
            timeStamp,
            inCount,
            outCount,
            receivingPower,
            transmissionPower,
            codeStatus,
            version,
            model,
            idStore: store ? store.idStore : ''  // Asignar 'idStore' si se encontró el 'sn' en Store, si no, dejarlo vacío
        });

        // Guardar el nuevo CountData en la base de datos
        const savedCountData = await newCountData.save();
        res.status(201).json(savedCountData);
    } catch (error) {
        res.status(400).json({ message: "Error creating CountData: " + error.message });
    }
};

// Listar todos los CountData
exports.listAll = async (req, res) => {
    try {
        const countDatas = await CountData.find();
        res.json(countDatas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Método para buscar CountData por múltiples campos específicos
exports.search = async (req, res) => {
    try {
        const query = {};
        const {
            sn,
            timeStamp,
            inCount,
            outCount,
            receivingPower,
            transmissionPower,
            codeStatus,
            version,
            model,
            idStore
        } = req.query;

        if (sn) query.sn = sn;
        if (timeStamp) query.timeStamp = new Date(timeStamp);
        if (inCount) query.inCount = Number(inCount);
        if (outCount) query.outCount = Number(outCount);
        if (receivingPower) query.receivingPower = Number(receivingPower);
        if (transmissionPower) query.transmissionPower = Number(transmissionPower);
        if (codeStatus) query.codeStatus = codeStatus;
        if (version) query.version = version;
        if (model) query.model = model;
        if (idStore) query.idStore = idStore;

        const countDatas = await CountData.find(query);
        if (countDatas.length > 0) {
            res.json(countDatas);
        } else {
            res.status(404).json({ message: 'No CountData found matching the criteria.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un CountData por ID
exports.update = async (req, res) => {
    try {
        const updatedCountData = await CountData.findByIdAndUpdate(req.params.uuid, req.body, { new: true });
        if (!updatedCountData) {
            res.status(404).json({ message: "CountData not found" });
        } else {
            res.json(updatedCountData);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un CountData por ID
exports.delete = async (req, res) => {
    try {
        const result = await CountData.findByIdAndDelete(req.params.uuid);
        if (!result) {
            res.status(404).json({ message: "CountData not found" });
        } else {
            res.json({ message: "CountData deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Método para buscar CountData con filtros avanzados
exports.advancedSearch = async (req, res) => {
    try {
        const {
            sn,
            startDate,
            endDate,
            dayOfWeek,
            idStores // Espera una lista de idStore separados por comas
        } = req.query;

        const query = {};

        if (sn) query.sn = sn;
        if (idStores) {
            query.idStore = { $in: idStores.split(',') };
        }
        if (startDate || endDate) {
            query.timeStamp = {};
            if (startDate) {
                query.timeStamp.$gte = new Date(startDate);
            }
            if (endDate) {
                query.timeStamp.$lte = new Date(endDate);
            }
        }

        // Agregando dinámicamente el filtro por día de la semana si es necesario
        if (dayOfWeek) {
            const days = dayOfWeek.split(',').map(Number); // Convierte la cadena en un array de números
            // La agregación para filtrar por día de la semana se manejará aquí
            const matchDayOfWeek = {
                $expr: {
                    $in: [{ $dayOfWeek: "$timeStamp" }, days]
                }
            };
            if (query.timeStamp) {
                query.timeStamp = { ...query.timeStamp, ...matchDayOfWeek };
            } else {
                query.timeStamp = matchDayOfWeek;
            }
        }

        const countDatas = await CountData.find(query);
        if (countDatas.length > 0) {
            res.json(countDatas);
        } else {
            res.status(404).json({ message: 'No CountData found matching the criteria.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
