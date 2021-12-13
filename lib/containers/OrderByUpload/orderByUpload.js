import React, { useState } from 'react';
import defaultClasses from './orderByUpload.scss';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Icon from '../../components/Icon';
import usePreventWindowDrop from '../../hooks/usePreventWindowDrop';

export const templateContent = `sku,quantity
SKU-1,1
SKU-2,2
SKU-3,3
SKU-4,4
SKU-5,5
`;

export const createTemplate = () => encodeURIComponent(templateContent);

const templateHref = `data:text/csv;charset=utf-8,${createTemplate()}`;
const templateFilename = 'template.csv';
const accept = '.csv';

const OrderByUpload = ({
  className,
  classes: propClasses,
  id = 'order-by-upload',
  labelText = 'Choose a file or drag it here.',
  downloadText = 'Download Template',
  showDownloadLink = true,
  onChange: onChangeProp,
  ...props
}) => {
  const [filename, setFilename] = useState('');
  const [dragging, setDragging] = useState(false);
  const classes = mergeClasses(defaultClasses, propClasses);
  let labelClasses = classes.root + (className ? ` ${className}` : '');
  labelClasses += dragging ? ` ${classes.dragging}` : '';
  usePreventWindowDrop();

  const parseFile = (contents, filename) => {
    const values = [];
    const [header, ...rows] = contents.split('\n').map(row => row.split(','));
    const skuIndex = header.indexOf('sku');
    const quantityIndex = header.indexOf('quantity');

    rows.forEach(row => {
      if (row[skuIndex].length <= 0) return;

      values.push({
        sku: row[skuIndex],
        quantity: row[quantityIndex],
      });
    });

    setFilename(filename);
    onChangeProp && onChangeProp(values);
  };

  const onChange = e => {
    e.persist();
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => parseFile(e.target.result, file.name);
    reader.readAsText(file);
  };

  return (
    <div className={classes.orderByUploadContainer}>
      <label
        className={labelClasses}
        htmlFor={id}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={onChange}
      >
        <input
          type='file'
          className={classes.inputField}
          id={id}
          accept={accept}
          onChange={onChange}
          {...props}
        />
        <Icon icon='file-upload' className={classes.uploadIcon} />
        {filename || labelText}
      </label>
      {showDownloadLink && (
        <a
          href={templateHref}
          download={templateFilename}
          className={classes.downloadLabel}
        >
          {downloadText}
        </a>
      )}
    </div>
  );
};

export default OrderByUpload;
