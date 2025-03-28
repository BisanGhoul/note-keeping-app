import Note from "../models/note.js";

const getPaginatedNotes = async (page, limit, query = "") => {
    try {
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const skip = (page - 1) * limit;

        const searchFilter = query
            ? {
                  $or: [
                      { title: { $regex: query, $options: "i" } },
                      { content: { $regex: query, $options: "i" } },
                  ],
              }
            : {};

        const aggregationPipeline = [
            { $match: searchFilter },
            {
                $facet: {
                    metadata: [{ $count: "totalCount" }],
                    notes: [
                        { $skip: skip },
                        { $limit: limit },
                        { $sort: { creationDate: -1 } },
                        {
                            $project: {
                                title: 1,
                                content: 1,
                                creationDate: 1,
                                _id: 1,
                            },
                        },
                    ],
                },
            },
        ];

        const result = await Note.aggregate(aggregationPipeline);

        const totalCount = result[0]?.metadata[0]?.totalCount || 0;
        const notes = result[0]?.notes || [];
        const totalPages = Math.ceil(totalCount / limit);

        return {
            notes,
            totalCount,
            totalPages,
            page,
        };
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw new Error(error.message);
    }
};

export { getPaginatedNotes };
