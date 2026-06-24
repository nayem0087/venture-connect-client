app.put('/api/startups/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        console.log("--- BACKEND HIT ---");
        console.log("Data Received for ID:", id);
        console.log("Body Data:", updatedData);

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid MongoDB ID format" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                name: updatedData.name,
                industry: updatedData.industry,
                funding: updatedData.funding,
                email: updatedData.email,
                description: updatedData.description,
                logo: updatedData.logo || "", 
                status: updatedData.status || "pending" 
            }
        };

        const result = await startupCollection.updateOne(filter, updateDoc);

        console.log("MongoDB Update Result:", result);

        if (result.matchedCount === 0) {
            return res.status(404).json({ success: false, message: "Startup not found to update" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Startup updated successfully",
            data: result 
        });

    } catch (error) {
        console.error("Backend Error Details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});