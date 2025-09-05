import React from 'react';

interface Header {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

interface TableProps {
  headers: Header[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto mt-6">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                className={`px-6 py-3 text-xs font-bold text-black uppercase ${
                  header.align === 'right'
                    ? 'text-right'
                    : header.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                } ${header.className || ''}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
}

// Subcomponentes

Table.Row = function TableRow({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
};

Table.Cell = function TableCell({
  children,
  align = 'left',
  className = '',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}) {
  const alignment =
    align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';

  return (
    <td className={`px-6 py-4 whitespace-nowrap ${alignment} ${className}`}>
      {children}
    </td>
  );
};
