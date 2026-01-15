import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLaptop } from "../context/LaptopContext";

const Laptop = (el) => {

    const pro = el.el
    const { user } = useAuth();
    const { laptopDelete, pacthLaptop, createLaptop } = useLaptop();
    const [isOpen, useIsOpen] = useState(false);
    const [open, useOpen] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            brand: e.target.brand.value,
            model: e.target.model.value,
            processor: e.target.processor.value,
            ram: e.target.ram.value,
            storage: e.target.storage.value,
            graphicCard: e.target.graphicCard.value,
            screenSize: e.target.screenSize.value,
            price: e.target.price.value
        }

        pacthLaptop(pro._id, formData);
        useIsOpen(false);
    }

    const handleCreate = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand", e.target.brand.value);
        formData.append("model", e.target.model.value);
        formData.append("processor", e.target.processor.value);
        formData.append("ram", e.target.ram.value);
        formData.append("storage", e.target.storage.value);
        formData.append("graphicsCard", e.target.graphicsCard.value);
        formData.append("screenSize", e.target.screenSize.value);
        formData.append("price", e.target.price.value);

        for (let i = 0; i < e.target.images.files.length; i++) {
            formData.append("images", e.target.images.files[i]);
        }
        createLaptop(formData);
        useOpen(false);

    }

    return (
        <>
            <div>

                <div>
                    {pro.images.map(image => {
                        return <img style={{width: "20%"}} src={image} alt="" />
                    })}
                </div>

                <div>
                    <p>Brand: {pro.brand}</p>
                    <p>Model: {pro.model}</p>
                    <p>Processor: {pro.processor}</p>
                    <p>RAM: {pro.ram}</p>
                    <p>Storage: {pro.storage}</p>
                    <p>Graphic Card: {pro.graphicCard}</p>
                    <p>Screen Size: {pro.screenSize}</p>
                    <p>Price: {pro.price}</p>

                    {["admin", "moderator"].includes(user.role) && <button onClick={() => laptopDelete(pro._id)}>Delete laptop</button>}
                    {["admin", "moderator"].includes(user.role) && <button onClick={() => useIsOpen(true)}>Change laptop</button>}
                    {user.role === "admin" && <button onClick={() => useOpen(true)}>Create laptop</button>}

                    {open && (
                        <form onSubmit={handleCreate} encType="multipart/form-data">
                            <input type="text" name="brand" placeholder="Brand" required/>
                            <input type="text" name="model" placeholder="Model" required/>
                            <input type="text" name="processor" placeholder="Processor" required/>
                            <input type="text" name="ram" placeholder="RAM" required/>
                            <input type="text" name="storage" placeholder="Storage" required/>
                            <input type="text" name="graphicsCard" placeholder="Graphic Card" required/>
                            <input type="text" name="screenSize" placeholder="Screen Size" required/>
                            <input type="number" name="price" placeholder="Price" required/>
                            <input type="file" name="images" multiple required/>
                            <button>Create laptop</button>
                            <button onClick={() => useOpen(false)}>Cancel</button>
                        </form>
                    )}

                    {isOpen && (<form onSubmit={(e) => handleSubmit(e, pro._id)}>
                        <input type="text" name="brand" placeholder="Brand" />
                        <input type="text" name="model" placeholder="Model" />
                        <input type="text" name="processor" placeholder="Processor" />
                        <input type="text" name="ram" placeholder="RAM" />
                        <input type="text" name="storage" placeholder="Storage" />
                        <input type="text" name="graphicCard" placeholder="Graphic Card" />
                        <input type="text" name="screenSize" placeholder="Screen Size" />
                        <input type="number" name="price" placeholder="Price" />
                        <button type="submit">Update laptop</button>
                        <button onClick={() => useIsOpen(false)}>Cancel</button>
                    </form>)}
                </div>
            </div>
        </>
    );

}

export default Laptop;