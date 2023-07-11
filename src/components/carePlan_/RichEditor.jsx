import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill"
import 'react-quill/dist/quill.snow.css';
import ApiConfig from "../../config/ApiConfig";
import { getUploadFileCategory, uploadFile } from "../../services/FileUploadService";
import { getObjectFromStore } from "../../storage/Storage";
import { getFileName, showToastError } from "../../Utils/Helper";

var Delta = Quill.import('delta');

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

export const RichEditor = ({ value, onChange, onAddNewFile, readOnly, toolbar = true, noStyle = true }) => {
  // return null;
  const quillRef = useRef(null);

  // Fix issue for shift + enter
  const lineBreakMatcher = () => {
    const newDelta = new Delta().insert('\n', { dataName: 'custom-break' });
    return newDelta;
  };


  const modules1 = {
    toolbar: {
      container: [
        // [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['formula', 'link', 'image', 'video'],
        ['clean'],
      ],
      'handlers': {
        image: imageHandler
      }
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
      matchers: [['BR', lineBreakMatcher]],
    }
  }

  // Fix issue for Focus
  const modules = useMemo(() => (modules1), []);

  // To upload image
  async function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async function () {
      const file = input.files[0];
      if (file.size > 5000000) {
        showToastError('Oops! The size limit for images  5.0 MB. Reduce the file size and try again.')
        return;
      }
      const fileName = getFileName(file);
      onAddNewFile(fileName);

      await uploadFile(file, getUploadFileCategory.blog, fileName)
      const range = quillRef.current.getEditor().getSelection();
      const user_id = getObjectFromStore("user_id");
      quillRef.current.getEditor().insertEmbed(range.index, 'image', `${ApiConfig.awsBaseUrl}blog/${user_id}/${fileName}`, 'user');

    }
  }

  return (
    <div className={`richtextCustom ${noStyle ? '' : 'rm'}`}>
      <ReactQuill
        theme={'snow'}
        readOnly={readOnly}
        ref={quillRef}
        value={value}
        onChange={(data) => onChange(data)}
        defaultValue={value} // Fix don't pass value prop it automatically handle by react-quill
        preserveWhitespace={true}
        modules={toolbar ? modules : {toolbar:false}}
        formats={formats}
        bounds={'.app'}
        placeholder={'Write something...'}
      />
    </div>
  )
}


