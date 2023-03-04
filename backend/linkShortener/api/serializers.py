from linkShortener.models import Socket

from rest_framework import serializers


class CreateSocketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Socket
        fields = (
            'full_url',
        )
