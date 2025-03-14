const {
    getInstallmentsService,
    getInstallmentByIdService,
    createInstallmentService,
    updateInstallmentService,
    deleteInstallmentService,
    getRecommendedInstallmentsService,
    getFilterInstallmentsService,
} = require("../../../services/apiService/installmentService");

class InstallmentController {
    async getInstallments(req, res) {
        try {
            const installments = await getInstallmentsService();

            if (!installments) {
                return res.status(200).json({message: "Installment not found"});
            }

            res.status(200).json({
                data: installments,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async getInstallmentById(req, res) {
        try {
            if (!req?.params?.installmentId)
                return res.status(400).json({message: "Installment id is required"});

            const id = req.params.installmentId;
            const installment = await getInstallmentByIdService(id);

            if (!installment) {
                return res.status(200).json({message: "Installment not found"});
            }

            res.status(200).json({
                data: installment,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async createInstallment(req, res) {
        try {
            if (!req?.body)
                return res.status(400).json({message: "Installment information is required"});

            const installment = req.body;
            const newInstallment = await createInstallmentService(installment);

            res.status(201).json({
                newInstallment: newInstallment,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async updateInstallment(req, res) {
        try {
            if (!req?.body)
                return res.status(400).json({message: "Installment information is required"});

            const installment = req.body;
            const [result] = await updateInstallmentService(installment);
            //   console.log(result)
            if (result === 0) return res.status(200).json({message: "No installment changed"});

            res.status(200).json({
                rowsEffected: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async deleteInstallment(req, res) {
        try {
            if (!req?.body)
                return res.status(400).json({message: "Installment information is required"});

            const id = req.body.id;
            const result = await deleteInstallmentService(id);
            if (result === 0) return res.status(200).json({message: "No installment be deleted"});

            res.status(200).json({
                rowsEffected: result,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async getRecommendedInstallments(req, res) {
        try {
            if (!req?.params) {
                return res.status(400).json({message: "Laptop information is required"})
            }
            const { laptopId } = req.params
            console.log(laptopId)
            const installments = await getRecommendedInstallmentsService(laptopId)

            if (!installments) {
                return res.status(200).json({message: "Installment not found"})
            }

            res.status(200).json({
                data: installments,
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }


    async getFilterInstallments(req, res) {
        try {
            if (!req?.query) {
                return res.status(400).json({message: "Laptop information is required"})
            }
            const { laptopId, term, downPayment } = req.query
            console.log(laptopId, term, downPayment)
            const installments = await getFilterInstallmentsService( {laptopId, term, downPayment} )

            if (!installments) {
                return res.status(200).json({message: "Installment not found"})
            }

            res.status(200).json({
                data: installments,
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

module.exports = new InstallmentController();
