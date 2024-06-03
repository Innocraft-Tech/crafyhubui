'use client';
import React, { useState } from 'react';

// import addBtn from "../../assets/addBtn.svg";

import { nanoid } from 'nanoid';
// import { TrashIcon } from "@heroicons/react/24/outline";
// import { Droppable, Draggable } from 'react-beautiful-dnd';
// import { Value } from "sass";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { TrashIcon } from 'lucide-react';
interface AddInputItem {
  uniqueString: string;
}
const Page = () => {
  const [addInput, setAddInput] = React.useState<AddInputItem[]>([
    { uniqueString: nanoid() },
  ]);
  const [openSidebar, setOpenSidebar] = useState(false);
  function handleInput() {
    const newItem: AddInputItem = { uniqueString: nanoid() };
    setAddInput((prev) => [...prev, newItem]);
  }
  function handleDelete(id: number) {
    if (addInput.length === 1) {
      alert("You can't delete the last item");
    } else {
      setAddInput((prev) => prev.filter((_, index) => index !== id));
    }
  }
  const [invoiceDetails, setInvoiceDetails] = React.useState<any>({
    invoiceNumber: '',
    issuedOn: '',
    billTo: '',
    due: '',
    project: '',
  });
  const [userData, setUserData] = React.useState<any>({
    item: '',
    quantity: '',
    price: '',
    total: '',
  });
  function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log(userData);
  }
  const downloadPdf = () => {
    const input = document.getElementById('invoiceContent');
    if (input) {
      html2canvas(input, { scale: 2 }).then(
        (canvas: {
          toDataURL: (arg0: string) => any;
          width: any;
          height: any;
        }) => {
          // Adjust scale for better quality
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [canvas.width, canvas.height],
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save('invoice.pdf');
        },
      );
    } else {
      console.error('Element with id "invoiceContent" not found');
    }
  };

  return (
    <>
      <div className="mx-6 grid w-[600px] grid-cols-1 gap-2 sm:w-[1200px] sm:grid-cols-2">
        <div className="h-screen border-r-2 border-r-gray-100">
          <span className="block text-gray-200"> From</span>
          <div className="flex justify-between">
            <span className="font-bold">Innocraft Technologies Pvt Ltd</span>
            <button
              type="button"
              className="mx-5 rounded-[30px] border px-1 py-1.5 text-xs"
            >
              Custom Branding
            </button>
          </div>
          <span className="text-xs"> INVOICE#</span> <br />
          <input
            type="text"
            placeholder="24-001"
            className="my-2 w-60 rounded-[10px] border border-gray-100 px-1 py-1.5 text-sm outline-none"
            name="invoice"
            value={invoiceDetails.invoiceNumber}
            onChange={(e) =>
              setInvoiceDetails({
                ...invoiceDetails,
                invoiceNumber: e.target.value,
              })
            }
          />
          <div className="mx-2 flex w-[310px] justify-between text-xs">
            <span> ISSUED ON</span>

            <span> BILL TO</span>
          </div>
          <div className="flex w-[500px] justify-between text-start text-xs">
            <input
              type="date"
              placeholder="24-001"
              className="my-2 w-[250px] rounded-[10px] border border-gray-100 px-1 py-1.5 text-xs outline-none"
              value={invoiceDetails.issuedOn}
              onChange={(e) =>
                setInvoiceDetails({
                  ...invoiceDetails,
                  issuedOn: e.target.value,
                })
              }
            />
            <input
              type="email"
              placeholder="enter email address"
              className="mx-2 my-2 w-[250px] rounded-[10px] border border-gray-100 px-2 py-1.5 text-sm outline-none"
              value={invoiceDetails.billTo}
              onChange={(e) =>
                setInvoiceDetails({ ...invoiceDetails, billTo: e.target.value })
              }
            />
          </div>
          <span className="mx-1 block text-xs"> Due</span>
          <input
            type="date"
            className="my-2 w-[250px] rounded-[10px] border border-gray-100 px-1 py-1.5 text-xs outline-none"
            name="due"
            value={invoiceDetails.due}
            onChange={(e) =>
              setInvoiceDetails({ ...invoiceDetails, due: e.target.value })
            }
          ></input>
          <hr className="my-2 border-gray-100" />
          <span className="block text-xs"> Project</span>
          <input
            type="text"
            placeholder="Select Project "
            className="my-3 w-[500px] rounded-[30px] border px-2 py-2 text-xs"
            value={invoiceDetails.project}
            onChange={(e) =>
              setInvoiceDetails({ ...invoiceDetails, project: e.target.value })
            }
          />
          <table className="border-b-2 border-b-gray-100">
            <thead className=" ">
              <tr className="">
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-normal text-slate-700 sm:table-cell"
                >
                  QTY
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-normal text-slate-700 sm:table-cell"
                >
                  Rate
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-left text-sm font-normal text-slate-700 sm:pr-6 md:pr-0"
                >
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {addInput.map((item, index) => (
                <>
                  <tr className="" key={item.uniqueString}>
                    <td className="py-1">
                      <div className="flex items-center font-medium text-slate-700">
                        {' '}
                        {/* <Image
                          src={TrashIcon}
                          alt="addBtn"
                          className=" inline my-6 sm:my-4"
                          width={20}
                          height={20}
                        /> */}
                        <input
                          type="text"
                          placeholder="Item / Service"
                          className="border-gray-20 mx-2 rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] border-2 border-solid px-2 py-2 sm:col-span-2 sm:w-[250px]"
                          onChange={(e) => handleUserInput(e)}
                          name="item"
                          value={userData.item}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-1 text-right text-sm text-slate-500 sm:table-cell">
                      <input
                        type="text"
                        placeholder="1"
                        className="border-gray-20 w-[70px] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] border-2 border-solid px-2 py-2"
                        onChange={(e) => handleUserInput(e)}
                        name="quantity"
                        value={userData.quantity}
                      />
                    </td>
                    <td className="px-3 py-1 text-right text-sm text-slate-500 sm:table-cell">
                      <input
                        type="text"
                        placeholder="$0.00"
                        className="border-gray-20 w-[70px] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[10px] rounded-tr-[10px] border-2 border-solid px-2 py-2"
                        onChange={(e) => handleUserInput(e)}
                        name="price"
                        value={userData.price}
                      />
                    </td>
                    <td className="mx-4 flex items-center justify-center py-1 text-right text-sm text-slate-500 sm:pr-6 md:pr-0">
                      <span className="my-1 py-2">$0.00</span>
                      <button
                        onClick={() => handleDelete(index)}
                        className="my-1 inline py-2"
                      >
                        <TrashIcon className="hover:stroke-Pink-900 mx-3 w-[25px] border-none" />
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div className="my-3 flex w-[75%] justify-between">
            <span className="text-sm">Total</span>
            <span>$00 </span>
          </div>
          <button
            className="bg-black-100 text-White-900 b before:after:first: hover:bg-Pink-900 hover:text-White-900 my-3 w-[200px] rounded-[30px] border px-1 py-2 text-sm font-semibold"
            onClick={handleInput}
          >
            + New Item
          </button>
        </div>

        <div className="">
          <div id="invoiceContent">
            {' '}
            world
            <p>Invoice Number: {invoiceDetails.invoiceNumber}</p>
            <p>Issued On: {invoiceDetails.issuedOn}</p>
            <p>Bill To: {invoiceDetails.billTo}</p>
            <p>Due: {invoiceDetails.due}</p>
            <p>Project: {invoiceDetails.project}</p>
            <ul>
              {Object.entries(userData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{' '}
                  {typeof value === 'string' ? value : ''}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={downloadPdf}>Download PDF</button>
        </div>
      </div>
    </>
  );
};

export default Page;
