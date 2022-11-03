from rest_framework.serializers import Serializer, FileField


class UploadFile(Serializer):
    file_uploaded = FileField()

    class Meta:
        fields = ['file_uploaded']
