import fsPromises from "node:fs/promises";
import { join } from "node:path";

type tablesAvailable = "tasks" | "users" | "products";
type ParamsProps = {
    [key: string]: string;
};

interface updateProps<T> {
    data: T;
    table: tablesAvailable;
    params: ParamsProps;
}
class Database {
    private dbPath: string;
    private database: {
        [key: string]: any[];
    };

    constructor() {
        const dirname = import.meta.dirname;
        const uploadsDirectory = join(dirname, "../uploads");
        this.dbPath = uploadsDirectory;
    }

    async init() {
        await fsPromises.mkdir(this.dbPath, { recursive: true });
        const dbFile = join(this.dbPath, "db.json");
        try {
            const file = await fsPromises.readFile(dbFile, {
                encoding: "utf-8",
            });
            const content = JSON.parse(file);
            this.database = content;
        } catch (error) {
            const placeholderContent = JSON.stringify({});
            await fsPromises.writeFile(dbFile, placeholderContent, {
                encoding: "utf-8",
            });
            this.database = {};
        }
    }

    async writeFile() {
        const dbFile = join(this.dbPath, "db.json");
        await fsPromises.writeFile(dbFile, JSON.stringify(this.database));
    }

    async writeCsvFile(name: string, data: string) {
        const dbFile = join(this.dbPath, `${name}.csv`);
        await fsPromises.mkdir(this.dbPath, { recursive: true });
        await fsPromises.appendFile(dbFile, data);
    }

    async select<T>(
        table: tablesAvailable,
        params: ParamsProps
    ): Promise<T[] | null> {
        const tableExist = this.checkTableExist(table);
        if (!tableExist) return null;

        if (params?.id) {
            const content: T[] = this.database[table].filter(
                (row) => row.id === params.id
            );
            return content;
        }

        const content: T[] = this.database[table];
        return content;
    }

    checkTableExist(table: tablesAvailable) {
        const tableExist = Array.isArray(this.database[table]);
        return tableExist;
    }

    async insert<T>(table: tablesAvailable, data: T) {
        const tableExist = this.checkTableExist(table);
        if (tableExist) {
            this.database[table].push(data);
        } else {
            this.database[table] = [data];
        }
        await this.writeFile();
    }

    async insertMany<T>(table: tablesAvailable, data: T[]) {
        const tableExist = this.checkTableExist(table);
        console.log(data[0]);
        if (tableExist) {
            this.database[table].push(...data);
        } else {
            this.database[table] = [...data];
        }
        await this.writeFile();
    }

    async delete(table: tablesAvailable, params: ParamsProps) {
        if (!params?.id) return null;
        const tableExist = this.checkTableExist(table);
        if (!tableExist) return null;
        const tableIndex = this.database[table].findIndex(
            (row) => row.id === params.id
        );
        if (tableIndex === -1) return null;
        this.database[table].splice(tableIndex, 1);
        await this.writeFile();
    }

    async update<T>(props: updateProps<T>): Promise<T | null> {
        const { data, params, table } = props;
        if (!params?.id) return null;
        const tableExist = this.checkTableExist(table);
        if (!tableExist) return null;
        const tableIndex = this.database[table].findIndex(
            (row) => row.id === params.id
        );
        if (tableIndex === -1) return null;
        const oldContent = this.database[table][tableIndex];
        const contentUpdated = {
            ...oldContent,
            ...data,
        };
        this.database[table][tableIndex] = contentUpdated;
        await this.writeFile();
        return contentUpdated;
    }
}

const database = new Database();
database.init();

export { database };
