"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInseminacion = exports.putInseminacion = exports.getInseminacionesPorFinca = exports.postInseminacion = exports.getInseminacion = exports.getInseminacionesPorAnimal = exports.getInseminaciones = void 0;
const sequelize_1 = require("sequelize");
const tbl_animales_1 = __importDefault(require("../models/tbl_animales"));
const tbl_inseminacion_1 = __importDefault(require("../models/tbl_inseminacion"));
const tbl_personas_1 = __importDefault(require("../models/tbl_personas"));
const getInseminaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const inseminaciones = yield tbl_inseminacion_1.default.findAll({
        where: {
            ins_estado: true
        },
        include: [
            { model: tbl_animales_1.default },
            { model: tbl_personas_1.default }
        ]
    });
    if (!inseminaciones) {
        return res.status(400).json({
            msg: `No Existe el listado de inseminaciones`,
        });
    }
    res.json({
        msg: `Lista de inseminaciones`,
        dato: inseminaciones
    });
});
exports.getInseminaciones = getInseminaciones;
const getInseminacionesPorAnimal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { ani_id } = req.params;
    const inseminaciones = yield ((_a = tbl_inseminacion_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.query(`
    SELECT inseminacion.* ,A1.ani_id as ani_id_padre, A1.ani_nombre as ani_id_padre_nombre, A1.ani_imagen as ani_id_padre_imagen,
    A2.ani_id as ani_id_animal, A2.ani_nombre as ani_id_animal_nombre, A2.ani_imagen as ani_id_animal_imagen,
    P1.*
    FROM tbl_inseminacion  as inseminacion
    INNER JOIN tbl_animales A1 On inseminacion.ani_idpadre= A1.ani_id
    INNER JOIN tbl_animales A2 On inseminacion.ani_id= A2.ani_id
    INNER JOIN tbl_personas P1 On inseminacion.per_id= P1.per_id
    WHERE inseminacion.ani_id=${ani_id}
    `, { type: sequelize_1.QueryTypes.SELECT }));
    if (!inseminaciones) {
        return res.status(400).json({
            msg: `No Existe el listado de inseminaciones`,
        });
    }
    res.json({
        msg: `Lista de inseminaciones`,
        dato: inseminaciones
    });
});
exports.getInseminacionesPorAnimal = getInseminacionesPorAnimal;
const getInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_id } = req.params;
    const inseminacion = yield tbl_inseminacion_1.default.findOne({
        where: {
            ins_id,
            ins_estado: true
        },
        include: [
            { model: tbl_personas_1.default },
            { model: tbl_animales_1.default }
        ]
    });
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el registro de inseminación con el id: ${ins_id}`
        });
    }
    res.json({
        msg: `Detalle de Inseminación`,
        dato: [inseminacion]
    });
});
exports.getInseminacion = getInseminacion;
const postInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_fechainseminacion, per_id, ani_id, ins_fechacomprobacion, ins_cargada, ins_tipoinseminacion, ani_idpadre, ins_numpajuela, ins_descripcion, } = req.body;
    const inseminacion = yield tbl_inseminacion_1.default.build({
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    });
    inseminacion.save();
    res.json({
        msg: `Se ha creado un nuevo registro de inseminación.`,
        dato: [inseminacion]
    });
});
exports.postInseminacion = postInseminacion;
const getInseminacionesPorFinca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { fin_id } = req.params;
    const inseminaciones = yield ((_b = tbl_inseminacion_1.default.sequelize) === null || _b === void 0 ? void 0 : _b.query(`
    
    SELECT inseminacion.* , 
    P1.* , 
    A1.* , 
    A2.ani_id as ani_id_padre , 
    A2.ani_nombre as ani_id_padre_nombre , 
    A2.ani_imagen as ani_id_padre_imagen 
    FROM tbl_inseminacion as inseminacion
    INNER JOIN tbl_personas P1 ON inseminacion.per_id=P1.per_id
    INNER JOIN tbl_animales A1 ON inseminacion.ani_id=A1.ani_id
    INNER JOIN tbl_animales A2 ON inseminacion.ani_idpadre=A2.ani_id
    WHERE A1.fin_id=${fin_id}
    `, { type: sequelize_1.QueryTypes.SELECT }));
    if (!inseminaciones) {
        return res.status(400).json({
            msg: `No Existe el listado de inseminaciones`,
        });
    }
    res.json({
        msg: 'Lista de inseminaciones',
        dato: inseminaciones
    });
});
exports.getInseminacionesPorFinca = getInseminacionesPorFinca;
const putInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_id } = req.params;
    const inseminacion = yield tbl_inseminacion_1.default.findOne({
        where: {
            ins_id,
            ins_estado: true
        }
    });
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el registro de inseminación con el id: ${ins_id}`
        });
    }
    const { ins_fechainseminacion, per_id, ani_id, ins_fechacomprobacion, ins_cargada, ins_tipoinseminacion, ani_idpadre, ins_numpajuela, ins_descripcion, } = req.body;
    yield inseminacion.update({
        ins_fechainseminacion,
        per_id,
        ani_id,
        ins_fechacomprobacion,
        ins_cargada,
        ins_tipoinseminacion,
        ani_idpadre,
        ins_numpajuela,
        ins_descripcion,
    });
    res.json({
        msg: `Se actualizó el dato de inseminación`,
        dato: [inseminacion]
    });
});
exports.putInseminacion = putInseminacion;
const deleteInseminacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ins_id } = req.params;
    const inseminacion = yield tbl_inseminacion_1.default.findOne({
        where: {
            ins_id,
            ins_estado: true
        }
    });
    if (!inseminacion) {
        return res.status(400).json({
            msg: `No existe el dato de inseminación con id: ${ins_id}`
        });
    }
    yield inseminacion.update({ ins_estado: false });
    res.json({
        msg: `Se eliminó el dato de inseminación con id: ${ins_id}`,
        dato: [inseminacion]
    });
});
exports.deleteInseminacion = deleteInseminacion;
//# sourceMappingURL=inseminacion.js.map