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
      // Directly update the name field
      updatedItems[index] = {
        ...updatedItems[index],
        [name]: value,
      };
    } else {
      // Update qty or rate after parsing them to numbers
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
    //
    //         <ul>
    //           {Object.entries(userData).map(([key, value]) => (
    //             <li key={key}>
    //               <strong>{key}:</strong>{' '}
    //               {typeof value === 'string' ? value : ''}
    //             </li>
    //           ))}
    //         </ul>

    <>
      <form
        onSubmit={downloadPdf}
        className="container grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        <div className="my-3 w-full items-start justify-center sm:border-r-2 sm:px-5">
          <p className="text-gray-400 sm:mx-3"> From </p>
          <div className="mx-1 flex items-baseline justify-between">
            <span className="text-xs font-bold sm:mx-2 sm:text-xs lg:text-sm 2xl:text-2xl">
              Innocraft Technologies pvt Ltd
            </span>
            <Button className="mx-1 my-1 rounded-[5px] border bg-[#ff0055] text-xs text-white">
              Custom Branding
            </Button>
          </div>
          <span className="text-xs font-bold sm:mx-3">INVOICE #</span>
          <input
            type="text"
            placeholder="24-001"
            className="mx-1 my-1 w-full rounded-[5px] border border-gray-400 px-1 py-1 text-sm"
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
              className="mx-1 w-full rounded-[5px] border border-gray-400 px-1 py-1 text-sm"
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
            className="mx-1 w-full rounded-[5px] border border-gray-400 px-1 py-1 text-sm"
            name="due"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            required={true}
          ></input>
          <p className="my-3 text-xs font-bold sm:mx-3"> PROJECT</p>
          <input
            type="text"
            placeholder="Select Project "
            className="mx-1 w-full rounded-[5px] border border-gray-400 px-1 py-1 text-sm"
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
                            value={item.qty}
                            required={true}
                          />
                        </td>
                        <td className="px-3 py-1 text-right text-sm text-slate-500 sm:table-cell">
                          <input
                            type="number"
                            placeholder="$0.00"
                            className="my-3 w-full rounded-[5px] border border-gray-400 px-2 py-1 text-sm"
                            name="rate"
                            value={item.rate}
                            onChange={(e) => {
                              handleItemChange(index, e);
                            }}
                            required={true}
                          />
                        </td>
                        <td className="mx-4 flex items-center justify-center py-1 text-right text-sm text-slate-500">
                          <button
                            onClick={() => handleDeleteItem(index)}
                            className="my-1 inline py-2"
                            type="button"
                          >
                            <TrashIcon
                              className="hover:stroke-Pink-900 mx-3 border-none hover:text-[#ff0055]"
                              width={25}
                              height={25}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mx-3 flex justify-between">
            <p className="text-sm font-bold">Total </p>
            <p className="text-sm font-bold">{'$' + total}</p>
          </div>
          <button
            className="text-White-900 hover: my-3 w-full rounded-[15px] border bg-[#ff0055] px-1 py-3 text-xs font-semibold text-white hover:bg-black hover:text-white"
            onClick={handleAddItem}
          >
            + ADD ITEM
          </button>
        </div>
        <div className="my-6 w-full items-center justify-center sm:my-12 sm:px-5">
          <div className="flex justify-between">
            <span className="my-3 text-xl font-bold"> Preview</span>
            <Button
              className="rounded-[5px] border bg-[#ff0055] text-xs text-white hover:bg-black hover:text-white"
              variant="outline"
              type="submit"
            >
              Download PDF
            </Button>
          </div>

          <div
            className="mx-auto my-3 rounded bg-white p-2 shadow-sm"
            id="invoiceContent"
          >
            <div className="grid grid-cols-2 items-center">
              <div>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 8.57143C0 3.83756 3.83756 0 8.57143 0H27.4286C32.1624 0 36 3.83756 36 8.57143V27.4286C36 32.1624 32.1624 36 27.4286 36H8.57143C3.83756 36 0 32.1624 0 27.4286V8.57143Z"
                    fill="#FF0055"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.4286 1.02857H8.57143C4.40562 1.02857 1.02857 4.40562 1.02857 8.57143V27.4286C1.02857 31.5944 4.40562 34.9714 8.57143 34.9714H27.4286C31.5944 34.9714 34.9714 31.5944 34.9714 27.4286V8.57143C34.9714 4.40562 31.5944 1.02857 27.4286 1.02857ZM8.57143 0C3.83756 0 0 3.83756 0 8.57143V27.4286C0 32.1624 3.83756 36 8.57143 36H27.4286C32.1624 36 36 32.1624 36 27.4286V8.57143C36 3.83756 32.1624 0 27.4286 0H8.57143Z"
                    fill="#FF0055"
                  />
                  <path
                    opacity="0.5"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.2861 10.3024C22.2861 11.4477 21.345 12.3762 20.184 12.3762L19.3409 12.3762C15.9046 12.3762 13.119 15.1243 13.119 18.5143C13.119 21.9043 15.9046 24.6524 19.3409 24.6524L19.7133 24.6524C20.8743 24.6524 21.8155 25.5808 21.8155 26.7262C21.8155 27.8715 20.8743 28.8 19.7133 28.8L19.3409 28.8C13.5827 28.8 8.9147 24.1949 8.9147 18.5143C8.9147 12.8336 13.5827 8.22857 19.3409 8.22858L20.184 8.22858C21.345 8.22858 22.2861 9.15706 22.2861 10.3024Z"
                    fill="white"
                  />
                  <path
                    opacity="0.7"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.6572 10.3024C23.6572 11.4477 22.7161 12.3762 21.5551 12.3762L20.712 12.3762C17.2757 12.3762 14.4901 15.1243 14.4901 18.5143C14.4901 21.9043 17.2757 24.6524 20.712 24.6524L21.0844 24.6524C22.2454 24.6524 23.1866 25.5808 23.1866 26.7262C23.1866 27.8715 22.2454 28.8 21.0844 28.8L20.712 28.8C14.9538 28.8 10.2858 24.1949 10.2858 18.5143C10.2858 12.8336 14.9538 8.22857 20.712 8.22858L21.5551 8.22858C22.7161 8.22858 23.6572 9.15706 23.6572 10.3024Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.0283 10.3024C25.0283 11.4477 24.1113 12.3762 22.9801 12.3762L22.1586 12.3762C18.8105 12.3762 16.0962 15.1243 16.0962 18.5143C16.0962 21.9043 18.8105 24.6524 22.1586 24.6524L22.5215 24.6524C23.6527 24.6524 24.5697 25.5808 24.5697 26.7262C24.5697 27.8715 23.6527 28.8 22.5215 28.8L22.1586 28.8C16.548 28.8 11.9998 24.1949 11.9998 18.5143C11.9998 12.8336 16.548 8.22857 22.1586 8.22858L22.9801 8.22858C24.1113 8.22858 25.0283 9.15706 25.0283 10.3024Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="text-right">
                <p>Crafy Hub </p>
                <p className="text-sm text-gray-500">innocrafthub@gmail.com</p>
                <p className="text-sm text-gray-500">+41-442341232</p>
                <p className="text-sm text-gray-500">VAT: 8657671212</p>
              </div>
            </div>

            <div className="grid grid-cols-2 items-center">
              <div className="my-3">
                <p className="font-bold text-gray-800">Bill to :</p>
                <p className="text-sm text-gray-500">
                  {project}
                  <br />
                  ven.efx
                </p>
                <p className="text-gray-500">{billTo}</p>
              </div>
              <div className="my-3 text-right">
                <p>
                  Invoice number:{' '}
                  <span className="text-gray-500">{invoiceNumber}</span>
                </p>
                <p>
                  Invoice date:{' '}
                  <span className="text-gray-500">{issuedOn}</span>
                </p>
                <p>
                  Due date: <span className="text-gray-500">{due}</span>
                </p>
              </div>
            </div>

            <div className="mx-4 flow-root sm:mx-0">
              <table className="min-w-full">
                <colgroup>
                  <col className="w-full sm:w-1/2" />
                  <col className="sm:w-1/6" />
                  <col className="sm:w-1/6" />
                  <col className="sm:w-1/6" />
                </colgroup>
                <thead className="border-b border-gray-300 text-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Items
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr className="border-b border-gray-200" key={index}>
                      <td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="font-medium text-gray-900">
                          {item.item}
                        </div>
                        {/* <div className="mt-1 truncate text-gray-500">
                          {item.}
                        </div> */}
                      </td>
                      <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                        {item.qty}
                      </td>
                      <td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
                        ${item.rate}
                      </td>
                      <td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                        {/* ${item.total.toFixed(2)} */}$ {item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="row"
                      className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                    >
                      Subtotal
                    </th>
                    <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
                      {/* ${subtotal.toFixed(2)} */}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                    >
                      Tax
                    </th>
                    <th
                      scope="row"
                      className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                    >
                      Tax
                    </th>
                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                      {/* ${tax.toFixed(2)} */}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
                    >
                      Discount
                    </th>
                    <th
                      scope="row"
                      className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                    >
                      Discount
                    </th>
                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">
                      - 10%
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      colSpan={3}
                      className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0"
                    >
                      Total
                    </th>
                    <th
                      scope="row"
                      className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                    >
                      Total
                    </th>
                    <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">
                      ${total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Page;
