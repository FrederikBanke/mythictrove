import { IResource, } from "types/projects";
import { createResource, getResource, removeResource, updateResource, } from "./resource";

describe("get resource", () => {
    const inputResources: IResource[] = [
        {
            id: "1",
            name: "Page 1",
            properties: [],
            tabs: [],
            parent: null,
            children: ["1-1"],
        },
        {
            id: "1-1",
            name: "Page 1-1",
            parent: "1",
            properties: [],
            tabs: [],
        },
        {
            id: "2",
            name: "Page 2",
            properties: [],
            tabs: [],
            parent: null,
            children: ["2-1", "2-2"],
        },
        {
            id: "2-1",
            name: "Page 2-1",
            parent: "2",
            properties: [],
            tabs: [],
            children: ["2-1-1"],
        },
        {
            id: "2-1-1",
            name: "Page 2-1-1",
            parent: "2-1",
            properties: [],
            tabs: [],
        },
        {
            id: "2-2",
            name: "Page 2-2",
            parent: "2",
            properties: [],
            tabs: [],
        },
        {
            id: "3",
            name: "Page 3",
            parent: null,
            properties: [],
            tabs: [],
            children: ["3-1", "3-2"],
        },
        {
            id: "3-1",
            name: "Page 3-1",
            parent: "3",
            properties: [],
            tabs: [],
        },
        {
            id: "3-2",
            name: "Page 3-2",
            parent: "3",
            properties: [],
            tabs: [],
        },
    ];
    test("should find the resource", () => {
        const expected: IResource = {
            id: "2-1-1",
            name: "Page 2-1-1",
            parent: "2-1",
            properties: [],
            tabs: [],
        };
        const actual = getResource(inputResources, "2-1-1");
        expect(actual).toStrictEqual(expected);
    });

    test("should return undefined when resource is not found", () => {
        const actual = getResource(inputResources, "2-4");
        expect(actual).toBeUndefined();
    });
});

describe("create resource", () => {
    test("should return new array with added resource", () => {
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const newResource: IResource = {
            id: "2-1-1",
            name: "Page 2-1-1",
            properties: [],
            tabs: [],
            parent: "2-1",
        };
        const actual = createResource(inputResources, newResource);
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "2-1-1",
                name: "Page 2-1-1",
                properties: [],
                tabs: [],
                parent: "2-1",
            },
        ];
        expect(actual).toStrictEqual(expected);
    });

    test("should not change input array", () => {
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const newResource: IResource = {
            id: "1",
            name: "Page 2-1-1",
            properties: [],
            tabs: [],
            parent: "2",
        };
        createResource(inputResources, newResource);
        expect(inputResources).toStrictEqual(expected);
    });

    test("should add resource to root", () => {
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const newResource: IResource = {
            id: "4",
            name: "Page 4",
            properties: [],
            tabs: [],
            parent: null,
        };
        const actual = createResource(inputResources, newResource);
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "4",
                name: "Page 4",
                properties: [],
                tabs: [],
                parent: null,
            },
        ];
        expect(actual).toStrictEqual(expected);
    });
});

describe("update resource", () => {
    test("should return new array with updated resource", () => {
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                parent: null,
                properties: [],
                tabs: [],
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                parent: null,
                properties: [],
                tabs: [],
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const updatedResource: IResource = {
            id: "2-1-1",
            name: "New name",
            parent: "2-1",
            properties: [],
            tabs: [],
        };
        const actual = updateResource(inputResources, updatedResource);
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                parent: null,
                properties: [],
                tabs: [],
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                parent: null,
                properties: [],
                tabs: [],
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "New name",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        expect(actual).toStrictEqual(expected);
    });

    test("should not change input array", () => {
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                parent: null,
                properties: [],
                tabs: [],
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                parent: null,
                properties: [],
                tabs: [],
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                parent: null,
                properties: [],
                tabs: [],
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                parent: null,
                properties: [],
                tabs: [],
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const updatedResource: IResource = {
            id: "2-1-1",
            name: "New name",
            parent: "2-1",
            properties: [],
            tabs: [],
        };
        updateResource(inputResources, updatedResource);
        expect(inputResources).toStrictEqual(expected);
    });

    test("should move resource and update parents", () => {
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                parent: null,
                properties: [],
                tabs: [],
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                parent: null,
                properties: [],
                tabs: [],
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const updatedResource: IResource = {
            id: "1-1",
            name: "Page 1-1",
            parent: "2-1-1",
            properties: [],
            tabs: [],
        };
        const actual = updateResource(inputResources, updatedResource);
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                parent: null,
                properties: [],
                tabs: [],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "2-1-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                parent: null,
                properties: [],
                tabs: [],
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1-1",
                parent: "2-1",
                properties: [],
                tabs: [],
                children: ["1-1"],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        expect(actual).toStrictEqual(expected);
    });
});

describe("delete resource", () => {
    test("should return new array without resource", () => {
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const actual = removeResource(inputResources, "2-1-1");
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        expect(actual).toStrictEqual(expected);
    });

    test("should not change input array", () => {
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        removeResource(inputResources, "2-1-1");
        expect(inputResources).toStrictEqual(expected);
    });

    test("should delete child resources of the delete parent", () => {
        const inputResources: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "2",
                name: "Page 2",
                properties: [],
                tabs: [],
                parent: null,
                children: ["2-1", "2-2"],
            },
            {
                id: "2-1",
                name: "Page 2-1",
                parent: "2",
                properties: [],
                tabs: [],
                children: ["2-1-1"],
            },
            {
                id: "2-1-1",
                name: "Page 2-1",
                parent: "2-1",
                properties: [],
                tabs: [],
            },
            {
                id: "2-2",
                name: "Page 2-2",
                parent: "2",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        const actual = removeResource(inputResources, "2");
        const expected: IResource[] = [
            {
                id: "1",
                name: "Page 1",
                properties: [],
                tabs: [],
                parent: null,
                children: ["1-1"],
            },
            {
                id: "1-1",
                name: "Page 1-1",
                parent: "1",
                properties: [],
                tabs: [],
            },
            {
                id: "3",
                name: "Page 3",
                parent: null,
                properties: [],
                tabs: [],
                children: ["3-1", "3-2"],
            },
            {
                id: "3-1",
                name: "Page 3-1",
                parent: "3",
                properties: [],
                tabs: [],
            },
            {
                id: "3-2",
                name: "Page 3-2",
                parent: "3",
                properties: [],
                tabs: [],
            },
        ];
        expect(actual).toStrictEqual(expected);
    });
});
