import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: true
})
class CashBook extends Model<CashBook> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: true
        },
        comment: "Reference no"
    })
    refNo: string | undefined;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: true
        },
        comment: "Description for the entry"
    })
    description: string | undefined;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        },
        comment: "Amount type of payment (cash/cheque/ecard/due)"
    })
    type: string | undefined;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        validate: {
            notNull: true
        },
        comment: "Amount"
    })
    amount: number | undefined;
}

export default CashBook;