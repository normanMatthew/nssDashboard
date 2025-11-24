export default {
    countDocuments: vi.fn().mockResolvedValue(1),
    find: vi.fn().mockReturnValue({
        sort: () => ({
            skip: () => ({
                limit: () => ({
                    lean: () => Promise.resolve([{ id: 1, status: "succes" }])
                })
            })
        })
    })
};