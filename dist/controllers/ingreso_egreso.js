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
exports.deleteIngresoEgreso = exports.putIngresoEgreso = exports.postIngresoEgreso = exports.getIngresoEgreso = exports.getIngresosEgresos = void 0;
const tbl_ingresoegreso_1 = __importDefault(require("../models/tbl_ingresoegreso"));
const getIngresosEgresos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ingresosEgresos = yield tbl_ingresoegreso_1.default.findAll({
        where: {
            ing_estado: true
        }
    });
    if (!ingresosEgresos) {
        return res.status(400).json({
            msg: `No se encontraron registros para mostrar`
        });
    }
    res.json({
        msg: `Lista de Ingresos y Egresos`,
        ingresosEgresos
    });
});
exports.getIngresosEgresos = getIngresosEgresos;
const getIngresoEgreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ing_id } = req.params;
    const ingresoEgreso = yield tbl_ingresoegreso_1.default.findByPk(ing_id);
    if (!ingresoEgreso) {
        return res.status(400).json({
            msg: 'No existe ese archivo en la base de datos'
        });
    }
    res.json({
        msg: 'Detalle de Ingreso/Egreso',
        ingresoEgreso
    });
});
exports.getIngresoEgreso = getIngresoEgreso;
const postIngresoEgreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ing_monto, ite_idingresoegreso, fin_id, ing_descripcion, ing_fecha } = req.body;
    const ingresoEgreso = yield tbl_ingresoegreso_1.default.build({
        ing_monto,
        ite_idingresoegreso,
        fin_id,
        ing_descripcion,
        ing_fecha
    });
    ingresoEgreso.save();
    res.json({
        msg: 'Se creó un nuevo ingreso/egreso',
        ingresoEgreso
    });
});
exports.postIngresoEgreso = postIngresoEgreso;
const putIngresoEgreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ing_id } = req.params;
    const ingresoEgreso = yield tbl_ingresoegreso_1.default.findByPk(ing_id);
    if (!ingresoEgreso) {
        return res.status(400).json({
            msg: `No existe el dato con id: ${ing_id}`
        });
    }
    const { ing_monto, ite_idingresoegreso, fin_id, ing_descripcion, ing_fecha } = req.body;
    yield ingresoEgreso.update({
        ing_monto,
        ite_idingresoegreso,
        fin_id,
        ing_descripcion,
        ing_fecha
    });
    res.json({
        msg: `Se actualizó el ingreso/egreso con id: ${ing_id}`,
        ingresoEgreso
    });
});
exports.putIngresoEgreso = putIngresoEgreso;
const deleteIngresoEgreso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ing_id } = req.params;
    const ingresoEgreso = yield tbl_ingresoegreso_1.default.findByPk(ing_id);
    if (!ingresoEgreso) {
        return res.status(400).json({
            msg: `No existe el dato con id: ${ing_id}`
        });
    }
    yield ingresoEgreso.update({ ing_estado: false });
    res.json({
        msg: `Se ha eliminado el Ingreso/Egreso con id: ${ing_id}`,
        ingresoEgreso
    });
});
exports.deleteIngresoEgreso = deleteIngresoEgreso;
//# sourceMappingURL=ingreso_egreso.js.map