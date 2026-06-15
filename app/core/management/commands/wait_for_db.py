"""
Django command to wait for the database to be available.
"""
import time
from psycopg2 import OperationalError as psycopg2_OperationalError
from django.core.management.base import BaseCommand
from django.db.utils import OperationalError


class Command(BaseCommand):
    """Django command to wait for database."""

    def handle(self, *args, **options):
        db_up = False
        attempts = 0
        while not db_up:
            try:
                self.check(databases=['default'])
                db_up = True
            except (psycopg2_OperationalError, OperationalError):
                attempts += 1
                self.stdout.write(
                    f'Database unavailable, waiting 1 second... (attempt {attempts})'
                )
                time.sleep(1)
        
        self.stdout.write(self.style.SUCCESS('Database available!'))