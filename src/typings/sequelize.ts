import { DataTypeAbstract, DefineAttributeColumnOptions } from 'sequelize';

export type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
};

// Add prototype declaration to sequlize model to allow for creating instance methods
declare module 'sequelize' {
    interface Model<TInstance, TAttributes> {
        prototype: any,
    }
}