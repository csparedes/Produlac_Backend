import { Request, Response } from "express";
import IngresoEgreso from "../models/tbl_ingresoegreso";

export const getIngresosEgresos = async (req: Request, res: Response) => {
    const ingresosEgresos = await IngresoEgreso.findAll({
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
    })
}

export const getIngresoEgreso = async (req: Request, res: Response) => {
    const { ing_id } = req.params;
    const ingresoEgreso = await IngresoEgreso.findByPk(ing_id);
    
    if (!ingresoEgreso) {
        return res.status(400).json({
            msg: 'No existe ese archivo en la base de datos'
        })
    }

    res.json({
        msg: 'Detalle de Ingreso/Egreso',
        ingresoEgreso
    });
}

export const postIngresoEgreso = async (req: Request, res: Response) => {
    const {
        ing_monto,
        ite_idingresoegreso,
        fin_id,
        ing_descripcion,
        ing_fecha
    } = req.body;

    const ingresoEgreso = await IngresoEgreso.build({
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
    })
}

export const putIngresoEgreso = async (req: Request, res: Response) => {
    const { ing_id } = req.params;
    const ingresoEgreso = await IngresoEgreso.findByPk(ing_id);

    if (!ingresoEgreso) {
        return res.status(400).json({
            msg: `No existe el dato con id: ${ing_id}`
        });
    }

    const {
        ing_monto,
        ite_idingresoegreso,
        fin_id,
        ing_descripcion,
        ing_fecha
    } = req.body;
    await ingresoEgreso.update({
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
}

export const deleteIngresoEgreso = async (req: Request, res: Response) => {
    const { ing_id } = req.params;
    const ingresoEgreso = await IngresoEgreso.findByPk(ing_id);

    if (!ingresoEgreso) {
        return res.status(400).json({
            msg: `No existe el dato con id: ${ing_id}`
        });
    }

    await ingresoEgreso.update({ ing_estado: false });
    res.json({
        msg: `Se ha eliminado el Ingreso/Egreso con id: ${ing_id}`,
        ingresoEgreso
    })
}