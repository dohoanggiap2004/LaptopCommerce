const {Installment, Laptop} = require("../../app/models");
const getInstallmentsService = async () => {
    return await Installment.findAll();
};

const getInstallmentByIdService = async (installmentId) => {
    return await Installment.findByPk(installmentId);
};

const createInstallmentService = async (installment) => {
    return await Installment.create(installment);
};
const updateInstallmentService = async (installment) => {
    const {installmentId, ...updateFields} = installment;

    return await Installment.update(updateFields, {
        where: {
            installmentId: installmentId
        }
    });
};

const deleteInstallmentService = async (id) => {
    return await Installment.destroy({
        where: {
            installmentId: id
        }
    });
};

const getRecommendedInstallmentsService = async (laptopId) => {
    const installments = await Installment.findAll({
        order: [['flatInterestRate', 'ASC']],
        limit: 6,
    });

    const laptop = await Laptop.findByPk(laptopId);
    if (!laptop) {
        return [];
    }

    let specialPrice = Number(laptop.specialPrice) || 0;
    if (isNaN(specialPrice)) {
        console.error('Invalid specialPrice:', laptop.specialPrice);
        specialPrice = 0;
    }

    const topInstallments = installments.map(installment => {
        const installmentData = installment.get({ plain: true });

        const flatInterestRate = parseFloat(installmentData.flatInterestRate.replace('%', '')) || 0;
        const downPaymentRate = parseFloat(installmentData.downPayment.replace('%', '')) || 0;

        let total = specialPrice + (specialPrice * flatInterestRate / 100);

        // Trích xuất số tháng từ term
        const termInMonths = parseInt(installmentData.term.replace(' tháng', '')) || 1;

        // Tính monthlyInstallment
        const downPayment = specialPrice * downPaymentRate / 100
        const monthlyInstallment = Math.round((total - downPayment) / termInMonths);
        return {
            ...installmentData,
            totalPayment: total,
            installmentPrice: specialPrice,
            difference: total - specialPrice,
            downPayment: downPayment,
            monthlyInstallment: monthlyInstallment,
        };
    });

    return topInstallments;
};

const getFilterInstallmentsService = async ({laptopId, term, downPayment}) => {
    const { Op } = require('sequelize');

    const installments = await Installment.findAll({
        where: {
            term: {
                [Op.like]: `${term.replace('%', '\\%')}%` // Escape ký tự % và sử dụng LIKE
            },
            downPayment: {
                [Op.like]: `${downPayment.replace('%', '\\%')}%` // Escape ký tự % và sử dụng LIKE
            }
        }
    });

    const laptop = await Laptop.findByPk(laptopId);
    if (!laptop) {
        return [];
    }

    let specialPrice = Number(laptop.specialPrice) || 0;
    if (isNaN(specialPrice)) {
        console.error('Invalid specialPrice:', laptop.specialPrice);
        specialPrice = 0;
    }

    const topInstallments = installments.map(installment => {
        const installmentData = installment.get({ plain: true });

        const flatInterestRate = parseFloat(installmentData.flatInterestRate.replace('%', '')) || 0;
        const downPaymentRate = parseFloat(installmentData.downPayment.replace('%', '')) || 0;

        let total = specialPrice + (specialPrice * flatInterestRate / 100);

        // Trích xuất số tháng từ term
        const termInMonths = parseInt(installmentData.term.replace(' tháng', '')) || 1;

        // Tính monthlyInstallment
        const downPayment = specialPrice * downPaymentRate / 100
        const monthlyInstallment = Math.round((total - downPayment) / termInMonths);
        return {
            ...installmentData,
            totalPayment: total,
            installmentPrice: specialPrice,
            difference: total - specialPrice,
            downPayment: downPayment,
            monthlyInstallment: monthlyInstallment,
        };
    });

    return topInstallments;
};






module.exports = {
    getInstallmentsService,
    getInstallmentByIdService,
    createInstallmentService,
    updateInstallmentService,
    deleteInstallmentService,
    getRecommendedInstallmentsService,
    getFilterInstallmentsService,
};
