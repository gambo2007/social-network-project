//set up filepond module
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode

)
FilePond.setOptions({
    stylePanAspecRatio: 150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 100,

})
FilePond.parse(document.body);

//
