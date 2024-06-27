'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { TrashIcon } from '@radix-ui/react-icons';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FormEvent, useEffect, useState } from 'react';

interface Item {
  item: string;
  qty: number;
  rate: number;
  total: number;
}

const Page = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [issuedOn, setIssuedOn] = useState('');
  const [billTo, setBillTo] = useState('');
  const [due, setDue] = useState('');
  const [project, setProject] = useState('');
  const [total, setTotal] = useState('$00');

  const [items, setItems] = useState<Item[]>([
    { item: '', qty: 1, rate: 0, total: 0 },
  ]);

  useEffect(() => {
    const total = items.reduce(
      (acc, item) => acc + parseFloat(item.total.toString()),
      0,
    );
    setTotal(total.toFixed(2));
  }, [items]);

  const handleItemChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    const updatedItems = [...items];

    if (name === 'item') {
      updatedItems[index] = {
        ...updatedItems[index],
        [name]: value,
      };
    } else {
      updatedItems[index] = {
        ...updatedItems[index],
        [name]: parseFloat(value),
      };
      handleItemTotalChange(index, updatedItems);
    }

    setItems(updatedItems);
  };



  const handleItemTotalChange = (index: number, updatedItems: Item[]) => {
    const item = updatedItems[index];
    const updatedTotal = item.qty * item.rate;
    updatedItems[index].total = updatedTotal;
    setItems([...updatedItems]);
  };

  const handleDeleteItem = (index: number) => {
    if (items.length > 1) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
    } else {
      // alert(''); // Using toast.error from Shancn UI
      toast({
        description: (
          <>
            <p>{'At least one item must remain.'}</p>
          </>
        ),
        variant: 'destructive',
      });
    }
  };

  const handleAddItem = () => {
    setItems([...items, { item: '', qty: 0, rate: 0, total: 0 }]);
  };


const downloadPdf = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const input = document.getElementById('invoiceContent');

  if (input) {
    // Save the initial state of the page
    const originalContent = input.innerHTML;

    html2canvas(input, { scale: 2 }).then((canvas: { toDataURL: (arg0: string) => any; width: any; height: any; }) => {
      // Adjust scale for better quality
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('invoice.pdf');

      // Restore the initial state of the page
      input.innerHTML = originalContent;
    });
  } else {
    toast({
      description: (
        <>
          <p>{'Element with id "invoiceContent" not found'}</p>
        </>
      ),
      variant: 'destructive',
    });
  }
};
  return (
    

    <>
    <form
      onSubmit={downloadPdf}
      className="container grid grid-cols-1 gap-2 sm:grid-cols-2"
    >
      <div className="my-3 w-full items-start justify-center sm:border-r-2 sm:px-5">
        <p className="text-gray-400 sm:mx-3"> From </p>
        <div className="mx-1 flex items-baseline justify-between">
          <span className="text-xs font-bold sm:mx-2 sm:text-xs lg:text-sm 2xl:text-2xl">
            Innocraft Technologies Pvt Ltd
          </span>
          <Button className="mx-1 my-1 rounded-[5px] border bg-[#ff0055] text-xs text-white">
            Custom Branding
          </Button>
        </div>
        <span className="text-xs font-bold sm:mx-3">INVOICE #</span>
        <input
          type="text"
          placeholder="24-001"
          className="mx-1 my-1 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
          name="invoice"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          required={true}
        />
        <div className="my-3 flex justify-between">
          <p className="mx-2 text-xs font-bold">ISSUED ON </p>
          <p className="mx-2 text-xs font-bold">BILL TO </p>
        </div>
        <div className="my-3 flex w-full justify-between overflow-y-hidden">
          <input
            type="date"
            placeholder="24-001"
            className="mx-1 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
            value={issuedOn}
            onChange={(e) => setIssuedOn(e.target.value)}
            required={true}
          />

          <input
            type="email"
            placeholder="Enter Email Address"
            className="mx-2 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
            value={billTo}
            onChange={(e) => setBillTo(e.target.value)}
            required={true}
          />
        </div>
        <p className="my-2 text-xs font-bold sm:mx-3"> DUE </p>
        <input
          type="date"
          className="mx-1 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
          name="due"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          required={true}
        ></input>
        <p className="my-3 text-xs font-bold sm:mx-3"> PROJECT</p>
        <input
          type="text"
          placeholder="Select Project "
          className="mx-1 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
          value={project}
          name="project"
          onChange={(e) => setProject(e.target.value)}
          required={true}
        />
        <p className="my-3 text-xs font-bold sm:mx-3"> INVOICE NUMBER</p>

        <div className="mx-auto my-5 w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="w-full rounded-[5px] bg-slate-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    QTY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Rate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <>
                  {items.map((item, index) => (
                    <tr className="" key={index}>
                      <td className="py-1">
                        <div className="flex items-center font-medium text-slate-700">
                          <input
                            type="text"
                            placeholder="Item / Service"
                            className="my-3 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
                            onChange={(e) => handleItemChange(index, e)}
                            name="item"
                            value={item.item}
                            required={true}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-1 text-right text-sm text-slate-500 sm:table-cell">
                        <input
                          type="number"
                          placeholder="1"
                          className="my-3 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
                          onChange={(e) => {
                            handleItemChange(index, e);
                          }}
                          name="qty"
                          value={item.qty.toString()}
                          required={true}
                        />
                      </td>
                      <td className="py-1 text-right text-sm text-slate-500 sm:table-cell">
                        <input
                          type="number"
                          placeholder="Rate"
                          className="my-3 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
                          onChange={(e) => handleItemChange(index, e)}
                          name="rate"
                          value={item.rate.toString()}
                          required={true}
                        />
                      </td>

                      <td className="flex items-center justify-center py-1 text-right text-sm text-slate-500 sm:table-cell">
                        <TrashIcon
                          className="h-5 w-5 cursor-pointer text-red-500"
                          onClick={() => handleDeleteItem(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
            <Button
              onClick={handleAddItem}
              type="button"
              className="ml-2 mt-2 flex items-center justify-center rounded-[5px] border border-blue-600 bg-[#ff0055] py-2 px-4 text-sm font-bold text-white"
            >
              Add Item
            </Button>
          </div>
        </div>

        <p className="text-md sm:mx-3 my-5 font-bold text-slate-700">
          TOTAL: {total}
        </p>

        <div className="mt-5">
          <Button
            className="my-2 flex items-center justify-center rounded-[5px] border border-blue-600 bg-[#ff0055] py-2 px-4 text-sm font-bold text-white"
            type="submit"
          >
            Download PDF
          </Button>
        </div>
      </div>

      <div className="relative my-3 w-full items-center justify-center overflow-x-auto rounded-md sm:px-5">
        <div id="invoiceContent" className="p-5">
          <div className="mx-auto flex w-full justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-2xl font-bold">INVOICE</h1>
              <p className="text-gray-400">
                Invoice Number: {invoiceNumber}
              </p>
              <p className="text-gray-400">Issued On: {issuedOn}</p>
              <p className="text-gray-400">Due Date: {due}</p>
              <p className="text-gray-400">Bill To: {billTo}</p>
              <p className="text-gray-400">Project: {project}</p>
            </div>
          </div>
          <div className="my-4 w-full overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="w-full rounded-[5px] bg-slate-200">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    QTY
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Rate
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-black"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <>
                  {items.map((item, index) => (
                    <tr className="" key={index}>
                      <td className="px-3 py-1 text-left text-sm text-slate-500 sm:table-cell">
                        {item.item}
                      </td>
                      <td className="px-3 py-1 text-left text-sm text-slate-500 sm:table-cell">
                        {item.qty}
                      </td>
                      <td className="px-3 py-1 text-left text-sm text-slate-500 sm:table-cell">
                        {item.rate.toFixed(2)}
                      </td>
                      <td className="px-3 py-1 text-left text-sm text-slate-500 sm:table-cell">
                        {item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </>
              </tbody>
            </table>
          </div>
          <div className="my-4 w-full text-right">
            <h2 className="text-xl font-bold">Total: {total}</h2>
          </div>
        </div>
      </div>
    </form>
  </>
);
};

export default Page;